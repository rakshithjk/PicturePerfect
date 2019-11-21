package main

import (
    
    "log"
    "net/http"
 	_ "github.com/go-sql-driver/mysql"
 	"github.com/gorilla/mux"
 	utils "clumio/utilities"
 	movie_reviews "clumio/reviews_handler"
 	home_handler "clumio/home"
 	datalist "clumio/data_Listing"
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
    myRouter.HandleFunc("/reviews/{id}",movie_reviews.DisplayReview)
    myRouter.HandleFunc("/home/movie",home_handler.HomeMovieDisplay)

    log.Fatal(http.ListenAndServe(":10000", myRouter))
}


