import express from "express";
import bodyParser from "body-parser";
import path from 'path'
import './db/mongoose'
import { ENVIRONMENT } from "./util/secrets";
import * as jwt from 'jsonwebtoken';

// Create Express server
const app = express()

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../client/web/dist')));

// API routes
app.use('/api', require('./api/controllers/index'))

// Return frontend app
if (ENVIRONMENT === 'production') {
  app.use('**', express.static(path.join(__dirname, './../client/web/dist')))
}

export default app;