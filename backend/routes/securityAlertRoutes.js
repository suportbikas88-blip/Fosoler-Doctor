const express = require("express");

const router = express.Router();


const adminAuthMiddleware =
    require("../middleware/adminAuthMiddleware");


const {

    createAlert,

    getAlerts,

    getAlertById,

    resolveAlert

} = require("../controllers/securityAlertController");




// Create Security Alert
router.post(
    "/",
    adminAuthMiddleware,
    createAlert
);




// Get All Security Alerts
router.get(
    "/",
    adminAuthMiddleware,
    getAlerts
);




// Get Single Alert
router.get(
    "/:id",
    adminAuthMiddleware,
    getAlertById
);




// Resolve Alert
router.put(
    "/resolve/:id",
    adminAuthMiddleware,
    resolveAlert
);



module.exports = router;
