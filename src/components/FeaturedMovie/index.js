import React, { useState } from 'react';
import './FeaturedMovie.css';

function FeaturedMovie({ item }) {
    const yearDate = new Date(item.first_air_date);
    
    const genres = [];
    item.genres.forEach((value) => {
        genres.push(value.name);
    });

    let description = item.overview;
    if (description.length > 140) {
        description = description.substring(0, 140) + '...';
    }

    // State to hold the current star rating
    const [rating, setRating] = useState(0);

    // Function to render clickable stars
    const renderStars = () => {
        const totalStars = 5;
        let stars = [];
        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}
                      onClick={() => setRating(i)}>&#9733;</span>
            );
        }
        return stars;
    };

    return (
        <div className="featured-movie" style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured-vertical">
                <div className="featured-horizontal">
                    <div className="featured-name">{item.original_name}</div>
                    <div className="featured-info">
                        <div className="featured-points">{renderStars()}</div>
                        <div className="featured-year">{yearDate.getFullYear()}</div>
                        <div className="featured-seasons">{item.number_of_seasons} season{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured-description">{description}</div>
                    <div className="featured-genres">
                        Genres: {genres.join(', ')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedMovie;
