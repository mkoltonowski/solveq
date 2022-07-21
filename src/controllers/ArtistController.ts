import Track from "../models/track";
import Artist from "../models/artist";
import Album from "../models/album";
import Genre from "../models/genre";

import {Request, Response} from "express";
import {Filter} from "../types";
import {Op} from "sequelize";
import sequelize from "../helpers/databaseHelper";



class ArtistController{


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

    async listByGenreId(request: Request<{},{},{},Filter>, response: Response){
        const {query} = request;

        if(!query.genre_id || isNaN(query.genre_id)){
            response.status(400).send("Error: genre_id is not specified!")
            return
        }

        const filter: Filter = {
            genre_id: query.genre_id,
        };

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
                        include: [{attributes: [], model: Genre, required: true, where: {GenreId: filter.genre_id}}]
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


    countMusicTracks(request: Request<{},{},{},Filter>, response: Response){
        
        const {query} = request;
        
        if(!query.artist_id || isNaN(query.artist_id)){
            response.status(400).send('Error: artist_id is not correctly specified!')
            return;
        }

        const result = Track.findAll({
            attributes:[[sequelize.literal('COUNT(TrackId)'), 'result']],
            replacements:{artist_id: query.artist_id},
            where:{
                AlbumId: {
                    [Op.in]: sequelize.literal(`(SELECT AlbumId FROM albums WHERE ArtistId = :artist_id)`)
                }
            }
        })

        const artist = Artist.findByPk(query.artist_id);

        Promise.all([artist, result]).then(values => {
            const [artist, result] = values;
            response.send({
                "artist": artist,
                "track_count": result
            })

        }).catch(error=>{
            response.status(500).send(`Internal server error: ${error}`)
            console.log('Error: ',error);
        })

    }


    getArtistAlbums(request: Request<{},{},{},Filter>, response: Response){

        const {query} = request;

        if(!query.artist_id || isNaN(query.artist_id)){
            response.status(400).send('Error: artist_id is not correctly specified!')
            return;
        }

        Album.findAll({
            where:{ArtistId: query.artist_id,}
        }).then( albums =>{
            response.send(albums);
        }).catch(error => response.status(500).send(`Internal server error: ${error}`));


    }
}

export default ArtistController