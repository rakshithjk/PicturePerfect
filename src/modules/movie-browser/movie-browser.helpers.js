const TMDB_IMAGE_BASE_URL = (width = 300) => `http://localhost:10000/poster_path`;

export const updateMoviePictureUrls = (movieResult, width = 300) => ({
  ...movieResult,
  background_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.background_path}`,
  poster_path: `${TMDB_IMAGE_BASE_URL(width)}${movieResult.poster_path}`,
});

export const getMoviesList = (moviesResponse) => {
  return !!moviesResponse ? ([
    ...moviesResponse.results.map(movieResult => updateMoviePictureUrls(movieResult))
  ]) : null;
}