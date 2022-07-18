import express from "express";
import ArtistController from "../controllers/ArtistController";

const Router = express.Router()
const Controller = new ArtistController()

Router.use('/listAll', Controller.getAllArtist);
Router.use('/listByGenreId', Controller.getArtistByGenreId);

export default Router;