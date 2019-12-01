package shows


import (
	"net/http"
	"fmt"
    "strings"
    /*
    "encoding/json"
    "database/sql"
 	_ "github.com/go-sql-driver/mysql"
 	
 	utils "clumio/utilities"
 	*/
 	movieshows "clumio/shows/shows_movies"
 	"strconv"
)




func Shows_handler(w http.ResponseWriter, r *http.Request){
	id := strings.Split(r.URL.Path, "/")
	fmt.Println(id)
	rtype := id[2]
	fmt.Println(rtype)	
	fmt.Println("hit")
	movie_id := id[3]
	queryValues := r.URL.Query()

    page,el := strconv.Atoi(queryValues.Get("page"))
    if el != nil {
		fmt.Println(el)
	}

	sort,el := strconv.Atoi(queryValues.Get("order"))
    if el != nil {
		fmt.Println(el)
	}
	
	fmt.Println(page,sort,movie_id)
	if(rtype == "movie"){
		movieshows.MovieShows(page,sort, w, movie_id)
	}
}