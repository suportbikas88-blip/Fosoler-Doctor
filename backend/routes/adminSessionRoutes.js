const express = require("express");

const router = express.Router();


const adminAuthMiddleware =
    require("../middleware/adminAuthMiddleware");


const {

    createSession,

    getSessions,

    logoutSession

} = require("../controllers/adminSessionController");




// Create Session
router.post(
    "/",
    adminAuthMiddleware,
    createSession
);



// Get All Sessions
router.get(
    "/",
    adminAuthMiddleware,
    getSessions
);



// Logout Session
router.put(
    "/logout/:id",
    adminAuthMiddleware,
    logoutSession
);



module.exports = router;
