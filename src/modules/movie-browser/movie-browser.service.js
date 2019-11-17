/*
const MOVIE_DB_API_KEY = '1a0e4aad6bccbbc5897fe049d89e61ff'
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
  }
  return baseUrl;
}

export const getTopMovies = async ({page}) => {
  const fullUrl = createMovieDbUrl('/movie/top_rated', {
    page
  });
  return fetch(fullUrl);
}

export const searchMovies = async ({ page, query}) => {
  const fullUrl = createMovieDbUrl('/search/movie', {
    page,
    query
  });
  return fetch(fullUrl);
}

export const getMovieDetails = async ({movieId}) => {
  const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
  return fetch(fullUrl);
}

*/

const MOVIE_DB_BASE_URL = 'http://localhost:10000';

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?language=en-US`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
  }
  return baseUrl;
}

export const getTopMovies = async ({page,order}) => {
  const fullUrl = createMovieDbUrl('/movie/top_rated', {
    page,
    order
  });
  console.log(fullUrl)
  return fetch(fullUrl);
}

export const searchMovies = async ({ page, query}) => {
  const fullUrl = createMovieDbUrl('/search/movie', {
    page,
    query
  });
  return fetch(fullUrl);
}

export const getMovieDetails = async ({movieId}) => {
  const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
  return fetch(fullUrl);
}

export const getMovieReviews = async({movieId,order,page}) => {
  const fullUrl = createMovieDbUrl(`/reviews/${movieId}`, {
    page,
    order
  });
  return fetch(fullUrl);
  

}