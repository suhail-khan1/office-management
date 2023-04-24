const company = require("../controllers/company.controller");

module.exports = router => {
    router.route('/')
    .get(company.getAllCompanies)
    .post(company.saveCompany);
    router.route('/:id')
    .put(company.updateCompany)
    .delete(company.deleteCompany);
} 