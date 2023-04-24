const employee = require('../models/employee.model');
const axios = require('axios');
const Employee = employee;
const companyAPIUrl = 'http://localhost:3000/api/company';


// Get all the employees 
exports.getAllEmployees = async (req, res) => {
    try {
        let employees = await Employee.find().lean().exec();
        await getCompaniesFromCompanyMicroService().then((response) => {
            if (employees && employees.length) {
                employees.forEach(employee => {
                    response.data.forEach(item => {
                        if (employee.company == item._id) {
                            employee['company'] = item;
                        }
                    })
                })
            }
        }).catch((error) => {
            if (error.response) {
                console.log('Error in fetching employees: ', error)
                res.status(error.response.status).send(error.response.data);
            } else {
                res.status(500).send('Internal server error.');
            }
        });
        res.status(200).send(employees);
    } catch (error) {
        console.log(`Error fetching employees: ${error}`);
        res.status(500).send('Error in fetching employees.');
    }
};

// Get all the companies from the company microservice
exports.getCompanies = async (req, res) => {
    try {
        await getCompaniesFromCompanyMicroService().then((response) => {
            res.status(response.status).send(response.data);
        }).catch((error) => {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else {
                res.status(500).send('Internal server error.');
            }
        })
    } catch (error) {
        console.log(`Error in fetching companies: ${error}`);
        res.status(500).send('Error in fetching companies.');
    }
}

// Save the employee
exports.saveEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(200).send('Employee created successfully.');
    } catch (error) {
        console.log(`Error creating employee: ${error}`);
        res.status(500).send('Error in creating employee.');
    }
};

// Update a particular employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) {
            return res.status(404).send('Employee not found.');
        }
        res.status(200).send('Employee updated successfully.');
    } catch (error) {
        console.log(`Error updating employee ${req.params.id}: ${error}`);
        res.status(500).send('Error in deleting employee.');
    }
};

// Delete a particular employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found.');
        }
        res.status(200).send('Employee deleted successfully.');
    } catch (error) {
        console.log(`Error deleting employee ${req.params.id}: ${error}`);
        res.status(500).send('Error in deleting employee.');
    }
};

// Function to get the companies from the company microservice
async function getCompaniesFromCompanyMicroService() {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: 'GET',
                url: companyAPIUrl,
                headers: { 'Content-Type': 'application/json', },
            };
            await axios(config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    })
}
