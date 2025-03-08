const { Notification } = require("../models/index");

class NotificationRepository {
  async getAll() {
    try {
      const noti = await Notification.findAll();
      return noti;
    } catch (error) {
      console.log("Something went wrong in the repository layer", error);
      throw error;
    }
  }

  async create(data) {
    try {
      const notification = await Notification.create(data);
      return notification;
    } catch (error) {
      console.log("Something went wrong in the repository layer", error);
      throw error;
    }
  }
}

module.exports = NotificationRepository;
