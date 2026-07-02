const eventService = require("../services/eventService");
const notificationService = require("../services/notificationService");
const queueWorker = require("../services/queueWorker");

const createEvent = async (req, res) => {

    try {

        const { event_type, recipient, data } = req.body;

        // Validation
        if (!event_type || !recipient) {
            return res.status(400).json({
                error: "event_type and recipient are required"
            });
        }

        // Save event
        const event_id = await eventService.createEvent(
            event_type,
            data
        );

        // Create notification
        const notification_id =
            await notificationService.createNotification(
                event_id,
                recipient
            );

        // Push into queue
        queueWorker.addToQueue(notification_id);

        // Return immediately
        return res.status(202).json({
            message: "Event accepted for processing",
            tracking_id: event_id,
            notification_id: notification_id,
            status: "pending"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }

};

module.exports = {
    createEvent
};