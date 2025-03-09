const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  EMAIL_ID: process.env.EMAIL_ID,
  EMAIL_PASS: process.env.EMAIL_PASS,
  MESSAGE_BORKER_URL: process.env.MESSAGE_BORKER_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
  CONFIRMATION_BINDING_KEY: process.env.CONFIRMATION_BINDING_KEY,
};
