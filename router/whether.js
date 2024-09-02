import express from "express";
import { getWeather } from "../controllers/weatherController.js";

const weatherRoute = express.Router();

// Route for getting featured tours
weatherRoute.get('/:city', getWeather);

export default weatherRoute;