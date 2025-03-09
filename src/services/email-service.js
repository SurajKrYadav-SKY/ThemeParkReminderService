const { Op } = require("sequelize");
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

  async fetchPendingEmails(timestamp, notificationType) {
    try {
      const response = await this.notificationRepository.getNotification({
        status: "pending",
        type: notificationType,
        notificationTime: { [Op.lte]: timestamp },
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

  async subscribeEvents(payload) {
    let { service, data } = payload;
    switch (service) {
      case "CREATE_NOTIFICATION":
        await this.createNotification(data);
        break;
      case "SEND_BASIC_MAIL":
        await this.sendBasicEmail(
          data.mailFrom,
          data.mailTo,
          data.mailSubject,
          data.mailBody
        );
        break;
      default:
        console.log("No valid event recieved.", service);
        break;
    }
  }
}

module.exports = EmailService;
