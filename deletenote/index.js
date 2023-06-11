const connectToMongo = require('./db');
const { v4: uuidv4 } = require('uuid');
const Note = require('../models/Notes')
connectToMongo();





module.exports = async function (context, req) {
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
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { 
            context.res = {
                status: 500, /* Defaults to 200 */
                body: "Note not found"
                };
         }

        // Allow deletion only if user owns this Note
        

        note = await Note.findByIdAndDelete(req.params.id)

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                "success": "Note deleted successfully"
            },
            };
        
    } catch (error) {
        console.error(error.message);

        context.res = {
            status: 500, /* Defaults to 200 */
            body: "Internal Server Error"
            };
    }
}