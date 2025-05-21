const Event = require('../module/eventschema');

const eventController = {
    createEvent: async (req, res) => {
        try {
            const event = new Event(req.body);
            await event.save();
            res.status(201).json(event);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const events = await Event.find();
            res.json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEventById: async (req, res) => {
        try {
            const { id } = req.params;
            const event = await Event.findById(id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, date, location } = req.body;
            const event = await Event.findByIdAndUpdate(
                id,
                { title, description, date, location },
                { new: true }
            );
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const event = await Event.findByIdAndDelete(id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json({ message: 'Event deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = eventController;