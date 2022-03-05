const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const port = process.env.PORT || 8081;
const path = require('path');
const public = path.resolve(__dirname, 'build')


app.use(cors({
    origin: true, // allow to server to accept request from different origin
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials: true, // allow session cookie from browser to pass through
})); //for cross-origin-resourses
app.use(express.static(public))
app.use(express.json({ virtuals: true }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "keyword",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 2592000000
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is running');
});