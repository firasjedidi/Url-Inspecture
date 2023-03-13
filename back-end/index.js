const express = require("express");
const app = express();
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const write = require('./routes/write');
const retrive = require('./routes/retrive');
require('dotenv').config();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(session({
  secret: 'keyboard ',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use('/api',auth);
app.use('/api',write);
app.use('/api',retrive);
app.listen(process.env.PORT||5000,()=>console.log('server on 5000'));




