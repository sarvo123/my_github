import express from 'express';
import dotenv from "dotenv"
import cors from 'cors';


import './passport/github.auth.js'
import authRoutes from "./routes/auth.Route.js"
import userRoutes from "./routes/user.Route.js"
import exploreRoutes from "./routes/explore.Route.js"
import connectToDb from './db/connectToDb.js';
import passport from 'passport';
import session from 'express-session';


dotenv.config();
const app = express();
app.use(cors());
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(session({ secret: `${process.env.SECRET_KEY}`, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/" , (req,res)=>{
    res.send("server is ready ");
});

// APIs ....
app.use("/api/auth" , authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore", exploreRoutes);


app.listen(5000 , ()=>{
    connectToDb();
    console.log("Server started  on PORT : 5000");
});
