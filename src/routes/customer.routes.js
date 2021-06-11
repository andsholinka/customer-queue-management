const Router = require('express').Router();
const Customer = require('../controllers/customer.controller');

Router.post('/', Customer.newCustomer)
    .get('/all', Customer.getAllCustomers)
    .get('/:id', Customer.getCustomerById)
    .put('/status/:id', Customer.changeStatusCustomer)
    .get('/all/query', Customer.searchCustomerByQuery)
    .get('/all/time', Customer.searchCustomerByRangeTime)
    .delete('/:id', Customer.deleteCustomerById)
    .delete('/', Customer.deleteAllCustomers)

module.exports = Router;