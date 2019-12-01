package home_handler

import (
	"net/http"
	"fmt"
    "encoding/json"
    "database/sql"
 	_ "github.com/go-sql-driver/mysql"
 	utils "clumio/utilities"
)



// All structs declared for functions, (to read from database)

type tvshows_list struct {
	Page int `json:"page"`
	Sort int `json:"sort:`
	Results []tvshow `json:"results"`
}
type tvshow struct {
    Id      int `json:"id"`
    Title   string `json:"title"`
    Language    string `json:"language"`
    Release_date string `json:"release_date"`
    Poster_path string `json:"poster_path"`
    Background_path string `json:"background_path"`
    Overview string `json:"overview"`
    Genre_ids string `json:"genre_ids"`
}

type total_page_count_tvshow struct{
	pages int 
}

/*
db = *DB

Init() {
	db = ..
}

GetDB() { return db }
*/
//  hometvshow retrieves only 5 tvshows to display in the homepage

func HomeTVShowsDisplay(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)													// Function to allow CORS


    db, err := sql.Open("mysql", "root:72574484@tcp(127.0.0.1:3306)/PicturePerfect")		// Connecting to Database
			 if err != nil {
				 fmt.Println(err)
				 }else{
				 fmt.Println("Connection Established")
			 }



	var query = "select * from tvshows  limit 5 " 	// Query string
	fmt.Println(query)
	rows,err:=db.Query(query)

	if err!=nil{
		fmt.Println(err)
	}

	var list tvshows_list
	var tag tvshow
	list.Page = 1
	list.Sort = 0
	for rows.Next(){
		
	 err:=rows.Scan(&tag.Id,&tag.Title,&tag.Release_date,&tag.Poster_path,&tag.Background_path,&tag.Overview,&tag.Genre_ids,&tag.Language)
	 if err != nil {
	 fmt.Println(err)
		}
		fmt.Println(tag.Id)
		list.Results = append(list.Results,tag)
	}

	err = rows.Err()
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()


	fmt.Println("page",list.Page)
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(list) 
	//spew.Dump(list)
	//fmt.Fprintf(w, "given lamguage, %q\n", tag.Poster_path)
}