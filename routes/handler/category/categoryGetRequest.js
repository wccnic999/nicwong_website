const keystone = require('keystone');
const APIError = require(global.__base + '/routes/lib/APIError');
const apiRequestHelper = require(global.__base +
    '/routes/lib/apiRequestHelper');

const _ = require('lodash');

const getCategoryList = (req, res) => {
    const categoryList = keystone.list('Category');
    return categoryList.model
        .find({
            status: 1
        })
        .lean()
        .exec()
        .then(response => {
            apiRequestHelper.sendGetRes(req, res, response, 200);
        })
        .catch(err => {
            apiRequestHelper.sendGetRes(
                req,
                res,
                {
                    message: err.message
                },
                400
            );
        });
}

module.exports = {
    getCategoryList,
}