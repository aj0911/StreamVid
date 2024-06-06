export const genre = {
    "Movie Genres": {
        28 : "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
    },
    "TV Show Genres": {
        10759: "Action & Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        10762: "Kids",
        9648: "Mystery",
        10763: "News",
        10764: "Reality",
        10765: "Sci-Fi & Fantasy",
        10766: "Soap",
        10767: "Talk",
        10768: "War & Politics",
        37: "Western"
    }
}
export const getGenres = (ids,isMovie=true)=>{
    const res = [];
    let st = '';
    const genreIds = Object.keys(genre[isMovie?'Movie Genres':'TV Show Genres']);
    const genreValues = Object.values(genre[isMovie?'Movie Genres':'TV Show Genres'])
    const indices = getIndices(genreIds,ids);
    indices.forEach(index=>res.push(genreValues[index]))
    res.forEach((genre,i)=>{
        st+=`${genre}`
        if(i!==res.length-1)st+=', '
    })
    return st;
}

const getIndices = (inputArray, targetElements)=>{
    const indices = [];
    for (const target of targetElements) {
        const index = inputArray.indexOf(`${target}`);
        if (index !== -1) {
            indices.push(index);
        }
    }
    return indices;
}
  