import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (request, response) => {
    response.send('This is my backend');
});

export default app;
