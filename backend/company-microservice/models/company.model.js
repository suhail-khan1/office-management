const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String }
});

module.exports = mongoose.model('company', companySchema);