const express = require("express");

const router = express.Router();


const adminAuthMiddleware =
    require("../middleware/adminAuthMiddleware");


const {

    createAudit,

    getAudits,

    getAuditById

} = require("../controllers/securityAuditController");



// Create Security Audit
router.post(
    "/",
    adminAuthMiddleware,
    createAudit
);



// Get All Security Audits
router.get(
    "/",
    adminAuthMiddleware,
    getAudits
);



// Get Single Audit
router.get(
    "/:id",
    adminAuthMiddleware,
    getAuditById
);



module.exports = router;
