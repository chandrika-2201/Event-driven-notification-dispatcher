const db = require("../db/database");

const queue = [];

// Add notification to queue
const addToQueue = (notification_id) => {

    queue.push(notification_id);

    console.log("Added to queue:", notification_id);

};

// Process Queue
const processQueue = () => {

    if (queue.length === 0) {
        return;
    }

    // Remove first notification from queue
    const notification_id = queue.shift();

    console.log("Processing Notification:", notification_id);

    // Random delay between 500 and 1000 ms
    const delay = Math.floor(Math.random() * 501) + 500;

    setTimeout(() => {

        // 10% Failure
        const failed = Math.random() < 0.1;

        if (failed) {

            console.log("Notification Failed:", notification_id);

            db.run(
                `
                UPDATE notifications
                SET
                    status = ?,
                    retry_count = retry_count + 1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                `,
                ["failed", notification_id]
            );

        } else {

            console.log("Notification Completed:", notification_id);

            db.run(
                `
                UPDATE notifications
                SET
                    status = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                `,
                ["completed", notification_id]
            );

        }

    }, delay);

};

// Check queue every second
setInterval(processQueue, 1000);

module.exports = {
    addToQueue
};