import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

 
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/events`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events. Please try again later.");
      });
  }, []);

  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container my-2">
            <h4>GFG Event</h4>
            <Link className="btn btn-primary ml-auto" to="/dashboard">
              Dashboard
            </Link>
          </div>
        </nav>
        <div className="row my-3">
          {error ? (
            <div className="col-12">
              <h3 className="text-danger">{error}</h3>
            </div>
          ) : events.length === 0 ? (
            <div className="col-12">
              <h3>No events available</h3>
            </div>
          ) : (
            events.map(event => {
              let day = '', month = '', year = '';
              if (event.date) {
                const date = new Date(event.date);
                day = date.getDate();
                month = date.toLocaleString("default", { month: "short" });
                year = date.getFullYear();
              }
              return (
                <div className="col-lg-4" key={event._id}>
                  <div className="card card-margin">
                    <div className="card-body pt-2">
                      <div className="widget-49">
                        <div className="widget-49-title-wrapper">
                          <div className="widget-49-date-primary">
                            <span className="widget-49-date-day">{day}</span>
                            <span className="widget-49-date-month">{month}</span>
                          </div>
                          <div className="widget-49-meeting-info">
                            <span className="widget-49-pro-title"><b>{event.title}</b></span>
                            <span className="widget-49-pro-title"><b>{event.location}</b></span>
                          </div>
                        </div>
                        <div className="widget-49-meeting-points">
                          <span>{event.description}</span>
                        </div>
                        <div className="widget-49-meeting-action">
                          <button className="btn btn-sm btn-flash-border-primary">
                            {day && month && year ? `${day}-${month}-${year}` : 'No Date'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
