const db = require("../config/dbConfig");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch admin data from DB
    const [rows] = await db.query("SELECT * FROM Admins WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    const admin = rows[0];

    // Compare plain text password
    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
