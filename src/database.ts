import mongoose from "mongoose";
import config from "./config";

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(config.DB.URI);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('database connected!');
})

connection.on('error', () => {
    console.log('database does not connected!');
    process.exit(0);
})
