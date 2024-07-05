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
import path from 'path';


dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000; 
const __dirname = path.resolve();
console.log("dirname" , __dirname);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(session({ secret: `${process.env.SECRET_KEY}`, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname , "/fronted/dist")))

app.get("*" , (req,res)=>{
    res.sendFile(path.join(__dirname , "fronted","dist","index.html"));
})


app.get("/" , (req,res)=>{
    res.send("server is ready ");
});

// APIs ....
app.use("/api/auth" , authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore", exploreRoutes);


app.listen(PORT , ()=>{
    connectToDb();
    console.log(`Server started  on PORT : ${PORT}`);
});
