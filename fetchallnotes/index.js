const connectToMongo = require('./db');
const { v4: uuidv4 } = require('uuid');
const Note = require('../models/Notes')
connectToMongo();




module.exports = async function (context, req) {
    context.res.headers = { "Content-Type": "application/json" };
    // context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: responseMessage
    // };
    try {
        const notes = await Note.find({  });
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                "note": notes
            },
            };
        //res.json(notes)
    } catch (error) {
        console.error(error.message);
        context.res = {
            status: 500, /* Defaults to 200 */
            body: "Internal Server Error"
            };
        //res.status(500).send("Internal Server Error");
    }
}