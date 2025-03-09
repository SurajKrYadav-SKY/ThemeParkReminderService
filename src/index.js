const bodyParser = require("body-parser");
const express = require("express");
const {
  PORT,
  REMINDER_BINDING_KEY,
  CONFIRMATION_BINDING_KEY,
} = require("./config/serverConfig");
const jobs = require("./utils/job");
const apiRoutes = require("./routes/index");
const EmailService = require("./services/email-service");

const { subscribeMessage, createChannel } = require("./utils/messageQueue");

const setupAndStartServer = async () => {
  const app = express();
  const emailService = new EmailService();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  const channel = await createChannel();
  await subscribeMessage(channel, emailService, REMINDER_BINDING_KEY);
  await subscribeMessage(channel, emailService, CONFIRMATION_BINDING_KEY);

  app.listen(PORT, () => {
    console.log("Server started at port :", PORT);

    jobs();
  });
};

setupAndStartServer();
