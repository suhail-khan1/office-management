const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

// Parse incoming request bodies in a middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle the origins
const cors = require('cors');
app.use(cors());

// Define the routes for microservices
const microserviceRoutes = [
  {
    path: '/api/company',
    target: 'http://localhost:3000/api/company'
  },
  {
    path: '/api/employee',
    target: 'http://localhost:3001/api/employee'
  }
];

// Create a function to handle incoming requests and forward them to the appropriate microservice
const handleRequest = (req, res) => {
  const route = microserviceRoutes.find(r => req.url.includes(r.path));
  if (!route) {
    return res.status(404).send('Not found');
  }
  const { target } = route;
  const url = `${target}${req.url.replace(route.path, '')}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method: req.method,
    url,
    headers,
    data: req.body,
    params: req.query,
  };

  axios(config)
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json('Internal server error');
      }
    });
};

// Use the handleRequest function as the request handler for all HTTP requests
app.use(handleRequest);

// Start the HTTP server
const port = 5000;
app.listen(port, () => {
  console.log(`API Gateway application is running on port ${port}`);
});
