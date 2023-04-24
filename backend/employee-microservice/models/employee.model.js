const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  company: { type: mongoose.Types.ObjectId },
  name: { type: String, required: true },
  address: { type: String }
});

module.exports = mongoose.model('employee', employeeSchema);