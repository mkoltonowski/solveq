
# SOLVEQ - Recrutation miniproject




# Endpoints

### GET /artist/listByGenreId
Get all artists from given gerne, sort them by name
#### parameters
Name | Required | Type | Description
--- | --- | --- | ---|
genre_id | required	 | Number | Identicator of genre in DB  |

#### response example
```
[
    {
        "ArtistId": 159,
        "Name": "Aquaman"
    },
    {
        "ArtistId": 147,
        "Name": "Battlestar Galactica"
    },
    {
        "ArtistId": 148,
        "Name": "Heroes"
    },
    {
        "ArtistId": 149,
        "Name": "Lost"
    },
    {
        "ArtistId": 156,
        "Name": "The Office"
    }
]
```

### GET /artist/countMusicTracks
Count how much music tracks have artists
#### parameters
Name | Required | Type | Description
--- | --- | --- | ---|
artist_id | required	 | Number | Identicator of an artist in DB  |

#### response example
```
{
    "artist": {
        "ArtistId": 1,
        "Name": "AC/DC"
    },
    "track_count": [
        {
            "result": 18
        }
    ]
}
```

### GET /artist/getArtistAlbums
Get all albums from artist
#### parameters
Name | Required | Type | Description
--- | --- | --- | ---|
artist_id | required	 | Number | Identicator of an artist in DB  |

#### response example
```
[
    {
        "AlbumId": 26,
        "Title": "Acústico MTV [Live]",
        "ArtistId": 19
    },
    {
        "AlbumId": 27,
        "Title": "Cidade Negra - Hits",
        "ArtistId": 19
    }
]
```
