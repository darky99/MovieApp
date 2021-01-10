import React, {useEffect, useState,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieLisdtHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const[favourites, setFavourites] = useState([]);
  const[searchValue, setSearchValue] = useState('');


const grtMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=53ec7e78`

  const response = await fetch(url);
  const responseJson = await response.json();

  if(responseJson.Search){
    setMovies(responseJson.Search);
  }
  
};


useEffect(()=>{
  grtMovieRequest(searchValue);
}, [searchValue]); //gets called when page load

useEffect(()=> {
  const movieFavourites =JSON.parse(
    localStorage.getItem('react-movie-app-favourites')
  );

  setFavourites(movieFavourites);

}, [])

const saveToLocalStorage = (items) =>{
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
}

const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
}

const removeFavouritesMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );

  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);

}

return <div className='container-fluid movie-app'>
    <div className='row d-flex align-item-center mt-4 mb-4'>
      <MovieLisdtHeading heading='Movies'/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
   
    <div className='row'>
      <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourite}/>
    </div>  
    <div className='row d-flex align-item-center mt-4 mb-4'>
      <MovieLisdtHeading heading='Favourites'/>
    </div>
    <div className='row'>
      <MovieList movies={favourites} handleFavouritesClick={removeFavouritesMovie} favouriteComponent={RemoveFavourites}/>
    </div> 

  </div>
}

export default App;
