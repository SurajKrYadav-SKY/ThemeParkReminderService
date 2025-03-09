const sender = require("../config/emailConfig");
const NotificationRepository = require("../repository/notification-repository");

class EmailService {
  constructor() {
    this.notificationRepository = new NotificationRepository();
  }
  async sendBasicEmail(mailFrom, mailTo, mailSubject, mailBody) {
    try {
      await sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody,
      });
      // console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchPendingEmails(timestamp) {
    try {
      const response = await this.notificationRepository.getNotification({
        status: "pending",
        type: "confirmation",
      });
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

  async updateNotification(id, data) {
    try {
      const response = await this.notificationRepository.update(id, data);
      return response;
    } catch (error) {
      console.log("Something went wrong in the service layer", error);
      throw error;
    }
  }
}

module.exports = EmailService;
