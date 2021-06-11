require('express');
const moment = require('moment');
const db = require("../models");
const Customer = db.customer;
const Queue = db.queue;

class CustomerController {

    async newCustomer(req, res, next) {

        const str = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        });
        const noUrut = await Queue.find()

        try {
            Customer.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dob: req.body.dob.toLocaleString('en-US', {
                        timeZone: 'Asia/Jakarta'
                    }),
                    age: req.body.age,
                    gender: req.body.gender,
                    phone: req.body.phone,
                    complaint: req.body.complaint,
                    queue: noUrut[0].data + 1,
                    date: str,
                    status: req.body.status ? req.body.status : false,
                })
                .then((cust) => {
                    res.status(201).json({
                        status: res.statusCode,
                        customer: cust,
                    });
                    const id = noUrut[0].id
                    Queue.findByIdAndUpdate(id, {
                            data: cust.queue
                        }, {
                            useFindAndModify: false
                        })
                        .then((data) => {})
                })
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: res.statusCode,
                message: err.message
            });
        }
    }

    async getAllCustomers(req, res, next) {

        const {
            page = 1, limit = 5
        } = req.query;

        try {
            const data = await Customer.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Customer.countDocuments();

            res.json({
                totalCustomers: count,
                data,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: res.statusCode,
                message: err.message
            });
        }
    }

    async getCustomerById(req, res, next) {

        try {
            const customer = await Customer.findOne({
                $or: [{
                        id: req.params.id
                    },
                    {
                        _id: req.params.id
                    }
                ]
            })

            if (customer) {
                let num = customer.queue
                let str = num.toString().padStart(3, "0")
                res.status(200).send({
                    status: res.statusCode,
                    data: customer
                })
            } else {
                res.status(400).json({
                    status: res.statusCode,
                    message: `Customer with ID = ${req.params.id} was not found!`
                })
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: res.statusCode,
                message: err.message
            });
        }
    }

    async changeStatusCustomer(req, res, next) {

        try {
            const cust = await Customer.findOne({
                $or: [{
                        id: req.params.id
                    },
                    {
                        _id: req.params.id
                    }
                ]
            })
            if (cust) {
                cust.status = req.body.status;
                const updateDatauser = await cust.save()

                res.status(200).json({
                    status: res.statusCode,
                    data: updateDatauser
                })
            } else {
                res.status(400).json({
                    status: res.statusCode,
                    message: `Customer with ID = ${req.params.id} was not found!`
                })
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: res.statusCode,
                message: err.message
            });
        }
    }

    async searchCustomerByQuery(req, res, next) {

        const {
            page = 1, limit = 5
        } = req.query;

        try {
            const data = await Customer.find({
                    $or: [{
                            status: req.query.data
                        },
                        {
                            gender: req.query.data
                        }
                    ]
                })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await Customer.countDocuments({
                $or: [{
                        status: req.query.data
                    },
                    {
                        gender: req.query.data
                    }
                ]
            });

            res.json({
                totalItems: count,
                data,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: res.statusCode,
                message: err.message
            });
        }
    }

    async searchCustomerByRangeTime(req, res, next) {

        const {
            page = 1, limit = 5
        } = req.query;
        const time = req.body

        try {
            let start = moment(time.start).format('YYYY-MM-DD 00:00:00.000+00');
            let end = moment(time.end).format('YYYY-MM-DD 23:59:59.000+00');

            if (time.start === undefined) {
                const history = await Customer.find()
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();

                const count = await Customer.countDocuments();

                res.json({
                    totalItems: count,
                    history,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page
                });
            } else {
                const history = await Customer.find({
                        createdAt: {
                            $gte: start,
                            $lt: end
                        }
                    })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec();
                const count = await Customer.countDocuments({
                    createdAt: {
                        $gte: start,
                        $lt: end
                    }
                });

                res.json({
                    totalItems: count,
                    history,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page
                });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: res.statusCode,
                message: err.message
            });
        }
    }

    async deleteCustomerById(req, res, next) {
        const id = req.params.id;

        Customer.findByIdAndRemove(id, {
                useFindAndModify: false
            })
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
                    });
                } else {
                    res.send({
                        message: `Customer with id=${id}. was deleted successfully!`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Could not delete Customer with id=" + id,
                });
            });
    }

    async deleteAllCustomers(req, res, next) {
        Customer.deleteMany({})
            .then((data) => {
                res.send({
                    message: `${data.deletedCount} Customers were deleted successfully!`,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while removing all customers.",
                });
            });
    }

}

module.exports = new CustomerController();