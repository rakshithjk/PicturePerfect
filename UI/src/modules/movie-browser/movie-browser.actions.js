
import {createAsyncActionCreator} from '../common/redux.helpers';
import * as movieService from './movie-browser.service';
import { release } from 'os';

export const keys = {
  'GET_TOP_MOVIES': 'GET_TOP_MOVIES',
  'SEARCH_MOVIES': 'SEARCH_MOVIES',
  'GET_MOVIE_DETAILS': 'GET_MOVIE_DETAILS',
  'GET_MOVIE_REVIEWS': 'GET_MOVIE_REVIEWS',
  'GET_MOVIES_HOME': 'GET_MOVIES_HOME',
  'GET_TVSHOWS_HOME': 'GET_TVSHOWS_HOME',
  'GET_TOP_TVSHOWS':'GET_TOP_TVSHOWS',
  'GET_TVSHOW_REVIEWS':'GET_TVSHOW_REVIEWS',
  'SUBMIT_DATA':'SUBMIT_DATA'
};

export const getTopMovies = (page,order) => createAsyncActionCreator(
  // actionType
  keys.GET_TOP_MOVIES,
  // requestFn
  movieService.getTopMovies, 
  // requestParams
  {page,order}
);

export const getTopTVshows = (page,order) => createAsyncActionCreator(
  // actionType
  keys.GET_TOP_TVSHOWS,
  // requestFn
  movieService.getTopTVShows, 
  // requestParams
  {page,order}
);

export const getHomeMovies = () => createAsyncActionCreator(
  keys.GET_MOVIES_HOME,
  movieService.getHomeMovies
)

export const getHomeTVShows = () => createAsyncActionCreator(
keys.GET_TVSHOWS_HOME,
movieService.getHomeTVShows
)

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

export const getTVShowReviews = (movieId, order, page) => createAsyncActionCreator(
  keys.GET_TVSHOW_REVIEWS,
  movieService.getTVShowReviews,
  {movieId, order, page}
);

