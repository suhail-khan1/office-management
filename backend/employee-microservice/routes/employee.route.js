const employee = require("../controllers/employee.controller");

module.exports = router => {
    router.route('/')
    .get(employee.getAllEmployees)
    .post(employee.saveEmployee);
    router.route('/:id')
    .put(employee.updateEmployee)
    .delete(employee.deleteEmployee);
    router.route('/get-companies')
    .get(employee.getCompanies);
} 