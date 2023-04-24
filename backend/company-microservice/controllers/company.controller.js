const company = require('../models/company.model');
const Company = company;


// Get all companies storeed in the company database
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().exec();
        res.status(200).send(companies);
    } catch (error) {
        console.log(`Error fetching companies: ${error}`);
        res.status(500).send('Error in fetching companies.');
    }
};


// Save the company
exports.saveCompany = async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(200).send('Company created successfully.');
    } catch (error) {
        console.log(`Error creating company: ${error}`);
        res.status(500).send('Error in creating company.');
    }
};


// Update a particular company details
exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!company) {
            return res.status(404).send('Company not found.');
        }
        res.status(200).send('Company updated successfully.');
    } catch (error) {
        console.log(`Error updating company ${req.params.id}: ${error}`);
        res.status(500).send('Error in deleting company.');
    }
};


// Delete a particular company
exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).send('Company not found');
        }
        res.status(200).send('Company deleted successfully.');
    } catch (error) {
        console.log(`Error deleting company ${req.params.id}: ${error}`);
        res.status(500).send('Error in deleting company.');
    }
};
