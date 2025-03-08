const sender = require("../config/emailConfig");
const NotificationRepository = require("../repository/notification-repository");

class EmailService {
  constructor() {
    this.notificationRepository = new NotificationRepository();
  }
  async sendBasicEmail(mailFrom, mailTo, mailSubject, mailBody) {
    try {
      const response = await sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody,
      });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchPendingEmails(timestamp) {
    try {
      const response = await this.notificationRepository.getAll();
      return response;
    } catch (error) {
      console.log("Something went wrong in the service layer", error);
      throw error;
    }
  }

  async createNotification(data) {
    try {
      const notification = await this.notificationRepository.create(data);
      return notification;
    } catch (error) {
      console.log("Something went wrong in the service layer", error);
      throw error;
    }
  }
}

module.exports = EmailService;
