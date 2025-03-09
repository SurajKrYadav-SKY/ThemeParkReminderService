const { Op } = require("sequelize");
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

  async update(id, data) {
    try {
      const noti = await Notification.findByPk(id);
      noti.status = data.status;
      await noti.save();
      return noti;
    } catch (error) {
      console.log("Something went wrong in the repository layer", error);
      throw error;
    }
  }

  async getNotification(filter) {
    try {
      const notifications = await Notification.findAll({
        where: {
          status: filter.status,
          type: filter.type,
          notificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return notifications;
    } catch (error) {
      console.log("Something went wrong in the repository layer", error);
      throw error;
    }
  }
}

module.exports = NotificationRepository;
