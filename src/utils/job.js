const cron = require("node-cron");
const EmailService = require("../services/email-service");
const sender = require("../config/emailConfig");

const emailService = new EmailService();

/**
 * we will run the cron job every 2 min
 * we will check are there any pending emails which was expected to be sent by now and is pending right now
 */

const setupJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    const response = await emailService.fetchPendingEmails();
    console.log(response);
    if (response.length !== 0) {
      response.forEach((email) => {
        sender.sendMail(
          {
            from: "reminder@noti.com",
            to: email.recipientEmail,
            subject: email.subject,
            text: email.content,
          },
          async (error, data) => {
            if (error) {
              console.log(error);
            } else {
              console.log(data);
              await emailService.updateNotification(email.id, {
                status: "sent",
              });
            }
          }
        );
      });
    }
  });
};

module.exports = setupJobs;
