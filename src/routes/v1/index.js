const express = require("express");
const router = express.Router();

const NotificationController = require("../../controllers/notification-controller");

const notificationController = new NotificationController();

router.post("/notification", notificationController.create);

module.exports = router;
