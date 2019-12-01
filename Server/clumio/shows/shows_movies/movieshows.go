package movieshows

import (
	"net/http"
	"fmt"
    //"strings"
    "database/sql"
    "strconv"
    "encoding/json"
    utils "clumio/utilities"
    /*
    
    
 	_ "github.com/go-sql-driver/mysql"
 	
 	utils "clumio/utilities"
 	*/
)

type shows_list struct {
	Page int `json:"page"`
	Sort int `json:"sort:`
	Movie_name string `json:movie_name`
	Total_page int `json:total_page`
	Results []show `json:"results"`
}
type show struct {
	Movie_id int `json:"movie_id"`
	Show_id int `json:"show_id"`
	City string `json:"city"`
	Time string `json:time"`
	Venue string `json:"venue"`
	
}

type total_page_count struct{
	pages int 
}


func MovieShows(sort int, page int, w http.ResponseWriter, id string){
	fmt.Println(sort,page,id)
	utils.EnableCors(&w)

	// Connection to DB
	db, err := sql.Open("mysql", "root:72574484@tcp(127.0.0.1:3306)/PicturePerfect")
			 if err != nil {
				 fmt.Println(err)
				 }else{
				 fmt.Println("Connection Established")
			 }


	var ordquery = ""	
	//switch
	if sort==1{
		ordquery = "ORDER BY show_id "
	}

	if sort==2{
		ordquery = "ORDER BY city "
	}

	if sort==3{
		ordquery = "ORDER BY venue"
	}


	total_page,err := db.Query("select count(*) from shows")				//  Total_page contains result of query to find total number of records in the Database
	if err!=nil{
		 	fmt.Println(err)
		 }

	var page_count total_page_count
	for total_page.Next(){
		err:=total_page.Scan(&page_count.pages)
			 if err != nil {
			 fmt.Println(err)
			}
	}
	if (10*page)>page_count.pages{
		page = 1
	}
	if (page==0){
		page=1;
	}


	var query1 = "select title from movies where id ="+ id
	fmt.Println(query1)
	rows1,err:=db.Query(query1)

		 if err!=nil{
		 	fmt.Println(err)
		 }



	var query = "select * from shows  where movie_id = "+id+" " +ordquery+" limit 10 offset "+strconv.Itoa((10*(page-1)))
	fmt.Println(query)
	rows,err:=db.Query(query)

		 if err!=nil{
		 	fmt.Println(err)
		 }
	 var list shows_list
	 var tag show


	 list.Total_page = page_count.pages
	 list.Page = page
	list.Sort = sort

	for rows1.Next(){
		err:=rows1.Scan(&list.Movie_name)
		if err != nil {
		 fmt.Println(err)
	 	}
	}
	 for rows.Next(){
	 	
		 err:=rows.Scan(&tag.Movie_id,&tag.Show_id,&tag.City,&tag.Time,&tag.Venue)
		 if err != nil {
		 fmt.Println(err)
	 	}
	 	fmt.Println(tag.Movie_id)
	 	list.Results = append(list.Results,tag)
	 }

	err = rows.Err()
	if err != nil {
	 	fmt.Println(err)
	}


	
	
	defer db.Close()

		
		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(list) 

}