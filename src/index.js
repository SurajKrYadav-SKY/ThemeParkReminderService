const bodyParser = require("body-parser");
const express = require("express");
const { PORT } = require("./config/serverConfig");

const { sendBasicEmail } = require("./services/email-service");

const setupAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log("Server started at port :", PORT);

    // testing the setup of SMTP using nodemailer
    sendBasicEmail(
      "<sender-email>",
      "<reciever-email>",
      "This is a testing mail",
      "Go to your mail and confirm whether you got the email or not"
    );
  });
};

setupAndStartServer();
