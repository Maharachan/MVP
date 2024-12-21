import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Admin.css";

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for better UX
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Format date to YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fetch appointments function
  const fetchAppointments = useCallback(async (date) => {
    const formattedDate = formatDate(date);
    setIsLoading(true); // Set loading to true while fetching data
    try {
      const response = await fetch(
        `https://miraculousmvp.com/api/fetch-appointments?date=${formattedDate}`, // Corrected endpoint
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      setFilteredAppointments(data.appointments || []); // Set appointments or empty array
      setError(""); // Clear previous errors
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
      setError("Unable to fetch appointments. Please try again later.");
      setFilteredAppointments([]); // Clear appointments on error
    } finally {
      setIsLoading(false); // Stop loading
    }
  }, []);

  // Handle date change on the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAppointments(date);
  };

  // Fetch appointments on component mount and when selectedDate changes
  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate, fetchAppointments]);

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>
      <div className="calendar-section">
        <h3>Select a Date</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="calendar"
        />
      </div>

      <div className="appointments-section">
        <h3>Appointments for {formatDate(selectedDate)}</h3>

        {isLoading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredAppointments.length > 0 ? (
          <ul className="appointments-list">
            {filteredAppointments.map((appointment, index) => (
              <li key={index} className="appointment-item">
                <p>
                  <strong>Time:</strong> {appointment.time || "N/A"}
                </p>
                <p>
                  <strong>Name:</strong> {appointment.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {appointment.email || "N/A"}
                </p>
                <p>
                  <strong>Contact:</strong> {appointment.contact || "N/A"}
                </p>
                {appointment.message && (
                  <p>
                    <strong>Message:</strong> {appointment.message}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found for this date.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
