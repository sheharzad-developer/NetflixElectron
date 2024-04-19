import React, { useState, useRef } from 'react';
import './MovieRow.css';

function MovieRow({ title, items }) {
    const listRef = useRef(null);
    const touchStartXRef = useRef(0);
    const scrollXRef = useRef(-400);

    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
        e.preventDefault(); // Prevent scrolling the entire page
    };

    const handleTouchMove = (e) => {
        const touchDelta = touchStartXRef.current - e.touches[0].clientX;
        const newX = scrollXRef.current + touchDelta;
        listRef.current.style.transition = 'none'; // Disable transitions for smooth scrolling
        listRef.current.style.transform = `translateX(${newX}px)`;
        e.preventDefault(); // Prevent scrolling the entire page
    };

    const handleTouchEnd = () => {
        const listWidth = items.results.length * 150;
        let x = parseInt(listRef.current.style.transform.replace('translateX(', '').replace('px)', ''));

        if (x > 0) x = 0;
        if (x < -(listWidth - window.innerWidth)) x = -(listWidth - window.innerWidth);

        scrollXRef.current = x;
        listRef.current.style.transition = 'transform 0.3s ease-out'; // Re-enable transitions for snap-back
        listRef.current.style.transform = `translateX(${x}px)`;
    };

    return (
        <div className="movie-row">
            <h2 className="movie-row-title">{title}</h2>
            <div className="movie-row-listarea">
                <div className="movie-row-list" ref={listRef}
                    style={{
                        transform: `translateX(${scrollXRef.current}px)`,
                        width: items.results.length * 150
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {items.results.map((movie, index) => (
                        <div key={index} className="movie-row-item">
                            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieRow;
