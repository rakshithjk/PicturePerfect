
import {createAsyncActionCreator} from '../common/redux.helpers';
import * as movieService from './movie-browser.service';

export const keys = {
  'GET_TOP_MOVIES': 'GET_TOP_MOVIES',
  'SEARCH_MOVIES': 'SEARCH_MOVIES',
  'GET_MOVIE_DETAILS': 'GET_MOVIE_DETAILS',
  'GET_MOVIE_REVIEWS': 'GET_MOVIE_REVIEWS',
};

export const getTopMovies = (page,order) => createAsyncActionCreator(
  // actionType
  keys.GET_TOP_MOVIES,
  // requestFn
  movieService.getTopMovies, 
  // requestParams
  {page,order}
);

export const searchMovies = (query, page) => createAsyncActionCreator(
  keys.SEARCH_MOVIES,
  movieService.searchMovies, 
  {query, page}
);

export const getMovieDetails = (movieId) => createAsyncActionCreator(
  keys.GET_MOVIE_DETAILS,
  movieService.getMovieDetails, 
  {movieId}
);

export const getMovieReviews = (movieId, order, page) => createAsyncActionCreator(
  keys.GET_MOVIE_REVIEWS,
  movieService.getMovieReviews,
  {movieId, order, page}
);