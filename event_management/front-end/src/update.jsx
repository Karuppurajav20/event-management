import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';

function Update() {
    const { id } = useParams();
   

    const [isLoading, setIsLoading] = useState(true);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedLocation, setUpdatedLocation] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    useEffect(() => {
        axios
            .get(`https://event-management-3-0myn.onrender.com/${id}`)
            .then(response => {
                setUpdatedTitle(response.data.title || '');
                setUpdatedDescription(response.data.description || '');
                setUpdatedLocation(response.data.location || '');
                setUpdatedDate(response.data.date ? response.data.date.substring(0, 10) : '');
                setIsLoading(false);
            })
            .catch(error => {
                alert('Error fetching event: ' + error);
                setIsLoading(false);
            });
    }, [id]);

    const handleUpdate = e => {
        e.preventDefault();

        const updatedEvent = {
            title: updatedTitle,
            description: updatedDescription,
            location: updatedLocation,
            date: updatedDate
        };

        axios
            .put(`http://localhost:4000/events/${id}`, updatedEvent)
            .then(() => {
                alert('Event updated successfully!');
                
            })
            .catch(error => {
                alert('Error updating event: ' + error);
            });
    };

    return (
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
                <div className="col-lg-4">
                    {isLoading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="updateTitle">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    id="updateTitle"
                                    placeholder="Event Title"
                                    value={updatedTitle}
                                    onChange={e => setUpdatedTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="updateDescription">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    id="updateDescription"
                                    placeholder="Enter Description"
                                    value={updatedDescription}
                                    onChange={e => setUpdatedDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="updateLocation">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    id="updateLocation"
                                    placeholder="Enter Location"
                                    value={updatedLocation}
                                    onChange={e => setUpdatedLocation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="updateDate">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    id="updateDate"
                                    placeholder="Enter Date"
                                    value={updatedDate}
                                    onChange={e => setUpdatedDate(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Update
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Update;