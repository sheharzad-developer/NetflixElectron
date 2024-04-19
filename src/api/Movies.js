const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b822441b5788e5af34364bd716eab043';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_URL}/${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Netflix Originals',
                items: await basicFetch(`discover/tv?with_network=213&language=en-US&api_key=${API_KEY}`),
            },
            {
                slug: 'trending',
                title: 'Recommended for You',
                items: await basicFetch(`trending/all/week?language=en-US&api_key=${API_KEY}`),
            },
            {
                slug: 'toprated',
                title: 'Top Rated',
                items: await basicFetch(`movie/top_rated?language=en-US&api_key=${API_KEY}`),
            },
            {
                slug: 'action',
                title: 'Action',
                items: await basicFetch(`discover/movie?with_genres=28&language=en-US&api_key=${API_KEY}`),
            },
            {
                slug: 'comedy',
                title: 'Comedy',
                items: await basicFetch(`discover/movie?with_genres=35&language=en-US&api_key=${API_KEY}`),
            },
            {
                slug: 'horror',
                title: 'Horror',
                items: await basicFetch(`discover/movie?with_genres=27&language=en-US&api_key=${API_KEY}`),
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`discover/movie?with_genres=10749&language=en-US&api_key=${API_KEY}`),
            },
            {
                slug: 'documentary',
                title: 'Documentaries',
                items: await basicFetch(`discover/movie?with_genres=99&language=en-US&api_key=${API_KEY}`),
            },
        ]
    },

    getMovieInfo: async(movieId, type) => {
        const info = await basicFetch(`${type}/${movieId}?language=en-US&api_key=${API_KEY}`)
        return info;
    }
}
