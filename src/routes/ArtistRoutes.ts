import express from "express";
import ArtistController from "../controllers/ArtistController";

const Router = express.Router()
const Controller = new ArtistController()

Router.get('/listAll', Controller.getAllArtist);
Router.get('/listByGenreId', Controller.listByGenreId);
Router.get('/countMusicTracks', Controller.countMusicTracks);

export default Router;