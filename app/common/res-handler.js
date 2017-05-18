/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var commonService = require("../common/commonService.js");
var async = require("async");
var log = require('log4js').getLogger("resHandler");

var status;
status = require('http-status');
module.exports = {
  add: function(res,data) {
    console.log(res);
    log.debug("response send successfully success");
res.send({
      status: 'success',
      message: 'Data added successfully',
      code:'200',
      data: data || {}
    });
  },
  delete: function(res,data) {
    console.log(res);
    log.debug("response send successfully success");
res.send({
      status: 'success',
      message: 'Data deleted successfully',
      code:'200',
      data: data || {}
    });
  },
  update: function(res,data) {
    console.log(res);
    log.debug("response send successfully success");
res.send({
      status: 'success',
      message: 'Data updated successfully',
      code:'200',
      data: data || {}
    });
  },
  success: function(res,data) {
    console.log(res);
    log.debug("response send successfully success");
  res.send({
      status: 'success',
      message: 'Data retrived successfully',
      code:'200',
      data: data || {}
    });
  },
  created: function(res,data) {
    log.debug("response send successfully created");

    return res.json({
      status: 'success',
    data: data || {}
    });
  },
  serverError: function(err, res) {
    console.log(err);
    return res.json(status.INTERNAL_SERVER_ERROR, {
      status: 'error',
      message: err.message
    });
  },
  validationError: function(errors, res) {
    console.log(errors);
    return res.json(status.BAD_REQUEST, {
      status: 'fail',
      message: 'Validation Error',
      data: errors
    });
  }
};
