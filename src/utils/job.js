const cron = require("node-cron");
const EmailService = require("../services/email-service");

const emailService = new EmailService();

/**
 * we will run the cron job every 2 min
 * we will check are there any pending emails which was expected to be sent by now and is pending right now
 */

const setupJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    const response = await emailService.fetchPendingEmails();
    console.log(response);
  });
};

module.exports = setupJobs;
