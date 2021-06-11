require('express');
const db = require("../models");
const Queue = db.queue;

class QueueController {

    async createQueue(req, res, next) {

        try {
            Queue.create({
                    data: req.body.data

                })
                .then((data) => {
                    res.status(201).json({
                        status: res.statusCode,
                        data: data,
                    });
                })
                .catch((err) => {
                    res.status(404).send({
                        status: res.statusCode,
                        message: "Some error occurred while creating the Number.",
                    });
                });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: res.statusCode,
                message: err.message
            });
        }
    }

    async resetQueue(req, res, next) {

        try {
            const noUrut = await Queue.find()
            const id = noUrut[0].id

            Queue.findByIdAndUpdate(id, req.body, {
                    new: true,
                    useFindAndModify: false
                }, function (err, doc) {})
                .then((data) => {
                    if (!data) {
                        res.status(404).send({
                            message: `Cannot reset queue number with id=${id}. Maybe data was not found!`,
                        });
                    } else res.send({
                        message: "Reset queue number was successfully",
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error updating User with id=" + id,
                    });
                });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                status: res.statusCode,
                message: err.message
            });
        }
    }

}

module.exports = new QueueController();