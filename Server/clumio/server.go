package main

import (
    "log"
    "net/http"
 	_ "github.com/go-sql-driver/mysql"
 	"github.com/gorilla/mux"
 	utils "clumio/utilities"
 	movie_reviews "clumio/reviews_handler/moviereviews"
 	home_handler "clumio/home"
 	datalist "clumio/data_Listing/datalist"
 	datalisttvshows "clumio/data_Listing/datalisttvshows"
 	tvshow_reviews "clumio/reviews_handler/tvshowreviews"
 	//"github.com/davecgh/go-spew/spew"
)



 
func main() {
	handleRequests()


}


func handleRequests() {
    myRouter := mux.NewRouter()
    myRouter.HandleFunc("/", home_handler.HomePage)
    myRouter.HandleFunc("/movie/top_rated", datalist.DataList)
    myRouter.HandleFunc("/poster_path/{id}",utils.Posterfunc)
    myRouter.HandleFunc("/movie/reviews/{id}",movie_reviews.DisplayReview)
    myRouter.HandleFunc("/home/movie",home_handler.HomeMovieDisplay)
    myRouter.HandleFunc("/home/tvshows",home_handler.HomeTVShowsDisplay)
    myRouter.HandleFunc("/tvshows/top_rated", datalisttvshows.DataList)
    myRouter.HandleFunc("/tvshow/reviews/{id}",tvshow_reviews.DisplayReview)

    log.Fatal(http.ListenAndServe(":10000", myRouter))
}



