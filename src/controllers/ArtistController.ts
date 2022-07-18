import Track from "../models/track";
import Artist from "../models/artist";
import Album from "../models/album";
import Genre from "../models/genre";

import {Request, Response} from "express";
import {GenreFilter} from "../types";
import { Op } from "sequelize";



class ArtistController{

    /**
     * [get] All artist list
     * @param {Request} request
     * @param {Response} response
     */
    async getAllArtist(request: Request, response: Response){
        try{
            const artists = await Artist.findAll();
            response.send(artists);
        }
        catch(e){
            response.status(500).send('Internal server Error')
            console.error(e);
        }
    }

    /**
     * [get] Filtered by genre artist list
     * @param {Request} request
     * @param {Response} response
     */
    async getArtistByGenreId(request: Request<{},{},{},GenreFilter>, response: Response){
        const {query} = request;
        const filter: GenreFilter = {
            genreId: query.genreId,
        };

        /**DB Query*/
        try{
            const artists = await Artist.findAll({
                include: {
                    attributes: [],
                    model: Album,
                    required: true,
                    include: [{
                        attributes: [],
                        model: Track,
                        required: true,
                        include: [{attributes: [], model: Genre, required: true, where: {GenreId: filter.genreId??null}}]

                    }]
                },
                group: "artist.Name",
                order: [
                    ["Name", "ASC"]
                ]
            })
            response.send(artists);
        }
        catch(error){
            response.status(500).send(`Internal server Error: ${error}`,)
            console.log('Error: ',error);
        }

    }

}

export default ArtistController