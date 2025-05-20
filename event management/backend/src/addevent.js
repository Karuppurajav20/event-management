// Example: src/AddEvent.jsx
import { useState } from 'react';
import axios from 'axios';

function AddEvent({ onEventAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:4000/events', form);
    setForm({ title: '', description: '', location: '', date: '' });
    if (onEventAdded) onEventAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEvent;