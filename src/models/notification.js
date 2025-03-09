"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init(
    {
      subject: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      recipientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      status: {
        type: DataTypes.ENUM("pending", "sent", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      type: {
        type: DataTypes.ENUM("confirmation", "reminder"),
        allowNull: false,
      },
      notificationTime: { type: DataTypes.DATE, allowNull: false },
      booking_id: { type: DataTypes.INTEGER, allowNull: false },
      sentAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "Notification",
      indexes: [
        { fields: ["notificationTime"] }, // Index for cron job efficiency
        { fields: ["status"] }, // Index for filtering pending notifications
      ],
    }
  );
  return Notification;
};
