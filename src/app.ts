import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import passportMiddleware from "./middlewares/passport";
import passport from "passport";

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(authRouter);

export default app;
