const async                 = require('async');
const keystone              = require('keystone');
const _                     = require('lodash');

const apiRequestHelper      = require(global.__base +
    '/routes/lib/apiRequestHelper');
const RecordStatus = require(global.__base + '/enum/RecordStatus');

const getWorkList = async (req, res) => {
        try {
            const workList = keystone.list('Work');
            var works = await workList.model
                .find({
                    status: RecordStatus['Enable'].key
                })
                .populate('categories')
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