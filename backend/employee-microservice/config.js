const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB database');
}).catch((error) => {
  console.log(`Error connecting to MongoDB database: ${error}`);
});