const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require('express-session')

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

const sessionConfig = {
    name:'monster',
    secret: 'lets keep it a secret',
    cookies: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig))

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "this is the message to show it works!" });
});

module.exports = server;
