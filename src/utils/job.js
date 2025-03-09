const cron = require("node-cron");
const EmailService = require("../services/email-service");
const sender = require("../config/emailConfig");

const emailService = new EmailService();

/**
 * we will run the cron job every 2 min
 * we will check are there any pending emails which was expected to be sent by now and is pending right now
 */

const setupJobs = () => {
  // cron-job for confirmation
  cron.schedule("*/2 * * * *", async () => {
    console.log("Checking for pending confirmation");
    const pendingConfirmations = await emailService.fetchPendingEmails(
      new Date(),
      "confirmation"
    );
    console.log(pendingConfirmations);
    if (pendingConfirmations.length !== 0) {
      for (const email of pendingConfirmations) {
        try {
          await emailService.sendBasicEmail(
            "reminder@noti.com",
            email.recipientEmail,
            email.subject,
            email.content
          );
          await emailService.updateNotification(email.id, {
            status: "sent",
            sentAt: new Date(),
          });
        } catch (error) {
          console.error(`Failed to send confirmation to ${email.id}:`, error);
          await emailService.updateNotification(email.id, { status: "failed" });
        }
      }
    }
  });

  // Reminder emails at 6:00 AM daily
  cron.schedule("0 6 * * *", async () => {
    console.log("Checking pending reminders...");
    const pendingReminders = await emailService.fetchPendingEmails(
      new Date(),
      "reminder"
    );
    for (const email of pendingReminders) {
      try {
        await emailService.sendBasicEmail(
          "reminder@noti.com",
          email.recipientEmail,
          email.subject,
          email.content
        );
        await emailService.updateNotification(email.id, {
          status: "sent",
          sentAt: new Date(),
        });
      } catch (error) {
        console.error(`Failed to send reminder to ${email.id}:`, error);
        await emailService.updateNotification(email.id, { status: "failed" });
      }
    }
  });
};

module.exports = setupJobs;
