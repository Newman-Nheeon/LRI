const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../Models/register.json')
 
router.route('/')
    .get((req, res) => {
        res.json(data.employees);
})
.post((req, res) => {
    res.json({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password
    });
})
.put((req, res) => {
    res.json({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password
    });
})
.delete((req, res) => {
    res.json({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password
    });
});

router.route('/:id')
.get((req, res) => {
    res.json({ "id": req.params.id });
});


module.exports = router;