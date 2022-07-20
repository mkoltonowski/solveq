import Track from "../models/track";
import Artist from "../models/artist";
import Album from "../models/album";
import Genre from "../models/genre";

import {Request, Response} from "express";
import {Filter} from "../types";
import {Op} from "sequelize";
import sequelize from "../helpers/databaseHelper";



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
     * [GET] Filtered by genre artist list
     * @param {Request<{},{},{},Filter>} request
     * @param {Response} response
     */
    async listByGenreId(request: Request<{},{},{},Filter>, response: Response){
        const {query} = request;
        const filter: Filter = {
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
            response.status(500).send(`Internal server error: ${error}`,)
            console.log('Error: ',error);
        }
    }



    /**
     * [GET] The count of music tracks of an artist
     * @param {Request<{},{},{},Filter>} request
     * @param {Response} response
     */
    countMusicTracks(request: Request<{},{},{},Filter>, response: Response){
        const {query} = request;
        if(query.artistId){
                /**DB QUERY*/
                const result = Track.count({
                    where:{
                        AlbumId: {
                            [Op.in]: sequelize.literal(`(SELECT AlbumId FROM albums WHERE ArtistId = ${query.artistId??0})`)
                        }
                    }
                })

                const artist = Artist.findByPk(query.artistId);

                Promise.all([artist, result]).then(values=>{

                    response.send({
                        "Artist": values[0],
                        "TrackCount": values[1]
                    })

                }).catch(error=>{
                    response.status(500).send(`Internal server error: ${error}`)
                    console.log('Error: ',error);
                })


        }
        else{
            response.status(400).send('Error: ArtistId is not specified')
        }
    }
}

export default ArtistController