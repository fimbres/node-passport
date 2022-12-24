import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

const dbOptions: ConnectOptions = {
    user: config.DB.USER,
    pass: config.DB.PASSWORD,
};

mongoose.set('strictQuery', false);
mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected!');
})

connection.on('error', () => {
    console.log('Database was not connected!');
    process.exit(0);
})
