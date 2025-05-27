import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

function App() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: ''
    });

    // ✅ Use env variable consistently
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

    const fetchEvents = () => {
        axios.get(`${API_BASE_URL}/api/events`)
            .then(res => setEvents(res.data))
            .catch(err => console.error('Fetch error:', err));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/api/events`, formData)
            .then(() => {
                setShowModal(false);
                setFormData({ title: '', description: '', location: '', date: '' });
                fetchEvents();
            })
            .catch((error) => {
                console.error('Error adding event:', error);
                alert('Failed to add event.');
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${API_BASE_URL}/events/${id}`)
            .then(() => fetchEvents())
            .catch(err => console.error('Delete error:', err));
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container my-2 d-flex justify-content-between">
                    <h4>Event Dashboard</h4>
                    <div>
                        <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>
                            Add Event
                        </button>
                        <Link className="btn btn-secondary" to="/">Home</Link>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h5 className="text-center my-2">List of Events</h5>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td>{event._id}</td>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>
                                    <Link to={`/update/${event._id}`} className="btn btn-warning btn-sm">
                                        Update
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add Event
                        </button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default App;
