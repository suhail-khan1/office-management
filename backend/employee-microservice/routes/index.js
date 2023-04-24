const employee  = require('./employee.route');

module.exports = router=>{
    employee(router);
    return router;
}