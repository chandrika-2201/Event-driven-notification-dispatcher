const db = require("../db/database");

const createEvent = (event_type, data) => {

    const sql = `
    INSERT INTO events
    (event_type, payload)
    VALUES (?, ?)
    `;

    return new Promise((resolve, reject) => {

        db.run(
            sql,
            [
                event_type,
                JSON.stringify(data)
            ],
            function(err){

                if(err){
                    reject(err);
                }else{
                    resolve(this.lastID);
                }

            }
        );

    });

};

module.exports = {
    createEvent
};