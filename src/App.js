import React, { useEffect, useState } from 'react'
import Movies from './api/Movies';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [collapsedHeader, setCollapsedHeader] = useState(false);


  useEffect(() => {
    const loadMovies = async () => {
      const movies = await Movies.getHomeList();
      setMovieList(movies);
      
      const originals = movies.filter(movie => movie.slug == 'originals');
      const randomNumber = Math.floor(Math.random() * (originals[0].items.results.length) - 1);
      const chosen = originals[0].items.results[randomNumber];
      console.log(originals, randomNumber, chosen)

      const chosenInfo = await Movies.getMovieInfo(chosen.id, 'tv');
      setFeaturedMovie(chosenInfo);
      console.log(chosenInfo)
    }

    loadMovies();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 50) {
        setCollapsedHeader(true);
      } else {
        setCollapsedHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return (
    <div className="page">
    
      <Header collapsed={collapsedHeader}></Header>

      {featuredMovie && <FeaturedMovie item={featuredMovie} />}
      
      <section className="movie-list">
        {movieList.map((item, key) => (
          <MovieRow title={item.title} items={item.items} key={key}></MovieRow>
        ))}
      </section>

      <Footer></Footer>

      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://cdn.lowgif.com/full/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" />
        </div>
      }
    </div>
  )
}

export default App
