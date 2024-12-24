const db = require("../config/dbConfig");
const moment = require("moment");
const nodemailer = require("nodemailer"); // Import Nodemailer
require("dotenv").config(); // Load .env variables

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail as the service provider
  auth: {
    user: process.env.GMAIL_USER, // Gmail address from .env
    pass: process.env.GMAIL_PASS, // App password from .env
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error setting up transporter:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// Function to send email to user
// const sendUserEmail = async (email, name, date, time) => {
//   const mailOptions = {
//     from: process.env.GMAIL_USER, // Sender email
//     to: email, // User email
//     subject: "Appointment Scheduled Successfully",
//     text: `Hello ${name},\n\nYour appointment has been successfully scheduled for ${date} at ${time}.\n\nThank you for choosing us!`,
//   };
//   await transporter.sendMail(mailOptions);
// };

const sendUserEmail = async (email, name, date, time) => {
  const mailOptions = {
    from: process.env.GMAIL_USER, // Sender email
    to: email, // User email
    subject: "Booking confirmed - MVP",
    text: `Hello ${name},

Your booking is confirmed with us for:

Date: ${date}
Time: ${time}
Service: "Regular Haircut $28"

We suggest arriving at least 10 minutes early to ensure everything proceeds smoothly.

Best wishes,
MVP`,
  };
  await transporter.sendMail(mailOptions);
};

// Function to send email to admin
// const sendAdminEmail = async (name, email, contact, message, date, time) => {
//   const mailOptions = {
//     from: process.env.GMAIL_USER, // Sender email  // for admin this email send to admin email (Sheduling mesg)
//     to: process.env.ADMIN_EMAIL, // Admin email
//     subject: "New Appointment Scheduled",
//     text: `A new appointment has been scheduled:\n\nName: ${name}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}\nDate: ${date}\nTime: ${time}`,
//   };
//   await transporter.sendMail(mailOptions);
// };

const sendAdminEmail = async (name, email, contact, message, date, time) => {
  const mailOptions = {
    from: process.env.GMAIL_USER, // Sender email
    to: process.env.ADMIN_EMAIL, // Admin email
    subject: "New Appointment Scheduled",
    text: `Hello Admin,

You received a new booking from ${name}.

Date: ${date}
Time: ${time}
Email: ${email}
Phone: ${contact}
Message: ${message}

Best wishes,
Team NashTech`,
  };
  await transporter.sendMail(mailOptions);
};

// Function to handle appointment scheduling
const scheduleAppointment = async (req, res) => {
  const { date, time, name, email, contact, message } = req.body;

  // Validate required fields
  if (!date || !time || !name || !email) {
    return res.status(400).json({
      error: "All fields (date, time, name, email) are required",
    });
  }

  try {
    // Convert time to 24-hour format (HH:mm:ss)
    const formattedTime = moment(time, "h:mm A").format("HH:mm:ss");

    // Insert data into the database
    const query = `INSERT INTO bookings (date, time, name, email, contact, message) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [date, formattedTime, name, email, contact, message];

    // Execute the query
    const [result] = await db.query(query, values);

    // Send emails to User and Admin
    await sendUserEmail(email, name, date, formattedTime);
    await sendAdminEmail(name, email, contact, message, date, formattedTime);

    // Respond with success
    res.status(201).json({
      message: "Appointment scheduled successfully, and emails sent",
      appointment: {
        id: result.insertId,
        date,
        time: formattedTime, // Send the formatted time back
        name,
        email,
        contact,
        message,
      },
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Database or Email error occurred" });
  }
};

module.exports = { scheduleAppointment };


