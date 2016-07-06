'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new
Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  full: String,
  timezone: String
});
module.exports = AddressSchema;