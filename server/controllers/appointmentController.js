// const db = require("../config/dbConfig");

// // Function to handle appointment scheduling
// const scheduleAppointment = async (req, res) => {
//   const { date, time, name, email, contact, message } = req.body;

//   // Validate required fields
//   if (!date || !time || !name || !email) {
//     return res.status(400).json({
//       error: "All fields (date, time, name, email) are required",
//     });
//   }

//   try {
//     // Insert data into the database
//     const [result] = await db.query(
//       `INSERT INTO bookings (date, time, name, email, contact, message)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [date, time, name, email, contact, message]
//     );

//     res.status(201).json({
//       message: "Appointment scheduled successfully",
//       appointment: {
//         id: result.insertId,
//         date,
//         time,
//         name,
//         email,
//         contact,
//         message,
//       },
//     });
//   } catch (err) {
//     console.error("Database Insert Error:", err.message);
//     res.status(500).json({ error: "Database error occurred" });
//   }
// };

// module.exports = { scheduleAppointment };

const db = require("../config/dbConfig");
const moment = require("moment");

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

    // Respond with success
    res.status(201).json({
      message: "Appointment scheduled successfully",
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
    console.error("Database Insert Error:", err.message);
    res.status(500).json({ error: "Database error occurred" });
  }
};

module.exports = { scheduleAppointment };
