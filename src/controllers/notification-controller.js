const EmailService = require("../services/email-service");

class NotificationController {
  constructor() {
    this.emailService = new EmailService();
  }

  async create(req, res) {
    try {
      const response = await this.emailService.createNotification(req.body);
      return res.status(201).json({
        data: response,
        success: true,
        message: "Successfully registered an email for notification",
      });
    } catch (error) {
      console.log("Something went wrong in the controller", error);
      return res.status(500).json({
        success: false,
        message: "Unable to register the email",
        error: error,
      });
    }
  }
}

module.exports = NotificationController;
