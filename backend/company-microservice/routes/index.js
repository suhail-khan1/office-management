const company  = require('./company.route');

module.exports = router=>{
    company(router);
    return router;
}