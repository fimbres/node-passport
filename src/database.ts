import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

const dbOptions: ConnectOptions = {
    user: config.DB.USER,
    pass: config.DB.PASSWORD,
};

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('database connected!');
})

connection.on('error', () => {
    console.log('database does not connected!');
    process.exit(0);
})
