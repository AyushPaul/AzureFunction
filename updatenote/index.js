const connectToMongo = require('./db');
const { v4: uuidv4 } = require('uuid');
const Note = require('../models/Notes')
connectToMongo();



module.exports = async function (context, req) {
    // context.res.headers = { "Content-Type": "application/json" };
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
        const { title, description, tag } = req.body;
        console.log(title)
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.name);
        if (!note) { 
            context.res = {
                status: 500, /* Defaults to 200 */
                body: "Note not found"
                };
        }

        note = await Note.findByIdAndUpdate(req.params.name, { $set: newNote }, { new: true })
        context.log(req.params.name)

        

        context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            "note": note
        },
        };
        //res.json(savedNote)

    } catch (error) {
        console.error(error.message);

        context.res = {
            status: 500, /* Defaults to 200 */
            body: "Internal Server Error"
            };
        //res.status(500).send("Internal Server Error");
    }
}