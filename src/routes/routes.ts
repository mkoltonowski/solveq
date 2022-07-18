import express from "express";
import ArtistRoutes from "./ArtistRoutes";

const Router = express.Router();

/**
 * App core route - Artist
 * contains subroutes to provide actions on "artist" model
 */
Router.use('/artist', ArtistRoutes)


/**
 * App core route - Albums
 * contains subroutes to provide actions on "album" model
 */
Router.use('/albums', ()=>{})

/**
 * Exception handling route
 */
Router.use('*',(req, res)=>{
   res.status(404).send('Data not found');
});

export default Router;