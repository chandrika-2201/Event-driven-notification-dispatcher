const db = require("../db/database");

const createNotification = (
    event_id,
    recipient
)=>{

    const sql=`
    INSERT INTO notifications
    (
        event_id,
        recipient,
        channel,
        status,
        retry_count
    )
    VALUES
    (
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `;

    return new Promise((resolve,reject)=>{

        db.run(

            sql,

            [
                event_id,
                recipient,
                "email",
                "pending",
                0
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

module.exports={
    createNotification
};