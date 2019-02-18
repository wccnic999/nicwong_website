const async = require('async');
const keystone = require('keystone');

const apiRequestHelper = require(global.__base +
    '/routes/lib/apiRequestHelper');

const getWorkList = async (req, res) => {
        try {
            const workList = keystone.list('Work');
            var works = await workList.model
                .find({
                    status: 1
                })
                .sort({ order: -1 })
                .exec();
        
                apiRequestHelper.sendPostRes(
                    req,
                    res,
                    works,
                );
        } catch (err) {
            apiRequestHelper.sendPostErrorRes(req, res, {
                message: err.message
            });
        }
}

module.exports = {
    getWorkList,
}