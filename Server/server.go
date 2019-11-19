package main

import (
    "fmt"
    "log"
    "net/http"
    "encoding/json"
    "database/sql"
 	_ "github.com/go-sql-driver/mysql"
 	"github.com/gorilla/mux"
 	"strconv"
 	"strings"
 	
 	//"github.com/davecgh/go-spew/spew"
)



func handleRequests() {
    myRouter := mux.NewRouter()
    myRouter.HandleFunc("/", homePage)
    myRouter.HandleFunc("/movie/top_rated", DataList)
    myRouter.HandleFunc("/poster_path/{id}",posterfunc)
    myRouter.HandleFunc("/reviews/{id}",reviewfunc)
    myRouter.HandleFunc("/home/movie",homeMovie)

    log.Fatal(http.ListenAndServe(":10000", myRouter))
}





func enableCors(w *http.ResponseWriter) {											// Function to enable CORS
	(*w).Header().Set("Access-Control-Allow-Origin", "*")

}



// All structs declared for functions, (to read from database)

type movie_list struct {
	Page int `json:"page"`
	Sort int `json:"sort:`
	Results []movie `json:"results"`
}
type movie struct {
    Id      int `json:"id"`
    Title   string `json:"title"`
    Language    string `json:"language"`
    Release_date string `json:"release_date"`
    Poster_path string `json:"poster_path"`
    Background_path string `json:"background_path"`
    Overview string `json:"overview"`
    Genre_ids string `json:"genre_ids"`
}

type total_page_count struct{
	pages int 
}

type review_list struct {
	Page int `json:"page"`
	Sort int `json:"sort:`
	Results []review `json:"results"`
}
type review struct {
	Movie_id int `json:"movie_id"`
	Review_id int `json:"review_id"`
	Review string `json:"review"`
	Rating float64 `json:rating"`
	User_id int `json:"user_id"`
	User_name string `json:"user_name"`

}


//////////////////////////////////////////////////////////////////////////

// Review function is used for getting all reviews 

func reviewfunc(w http.ResponseWriter, r *http.Request){
	enableCors(&w)


	// Retrieve query parameters from the url

	queryValues := r.URL.Query()

    page,el := strconv.Atoi(queryValues.Get("page"))
    if el == nil {
		fmt.Println(el)
	}

	sort,el := strconv.Atoi(queryValues.Get("order"))
    if el == nil {
		fmt.Println(el)
	}
	
	id := strings.TrimPrefix(r.URL.Path, "/reviews/")


	// Connection to DB
	db, err := sql.Open("mysql", "root:72574484@tcp(127.0.0.1:3306)/PicturePerfect")
			 if err != nil {
				 fmt.Println(err)
				 }else{
				 fmt.Println("Connection Established")
			 }


	var ordquery = ""	
	if sort==1{
		ordquery = "ORDER BY rating_id "
	}

	if sort==2{
		ordquery = "ORDER BY user_name "
	}

	if sort==3{
		ordquery = "ORDER BY rating desc"
	}


	total_page,err := db.Query("select count(*) from movies")				//  Total_page contains result of query to find total number of records in the Database
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


	
	var query = "select * from reviews where movie_id = "+id+" "+ordquery+" limit 10 offset "+strconv.Itoa((10*(page-1)))
	fmt.Println(query)
	rows,err:=db.Query(query)

		 if err!=nil{
		 	fmt.Println(err)
		 }
	 var list review_list
	 var tag review
	 list.Page = page
	list.Sort = sort
	 for rows.Next(){
	 	
		 err:=rows.Scan(&tag.Movie_id,&tag.Review_id,&tag.Review,&tag.Rating,&tag.User_id,&tag.User_name)
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

// posterfunc is for obtaining the url of the poster images which would be stored in a different location


func posterfunc(w http.ResponseWriter, r *http.Request){
    w.Header().Set("Content-Type", "image/jpeg")
    vars := mux.Vars(r)
    key := vars["id"]
    var url = "/home/rakshithjk/go/src/clumio/images/"+key
    //url = "/home/rakshithjk/go/src/clumio/images/3TpMBcAYH4cxCw5WoRacWodMTCG.jpg"
    http.ServeFile(w, r, url)
}



// blank function. written for testing :)

func homePage(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
    fmt.Fprintf(w, "Welcome to the HomePage!")
    fmt.Println("Endpoint Hit: homePage")
}


//  homeMovie retrieves only 5 movies to display in the homepage

func homeMovie(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)													// Function to allow CORS


    db, err := sql.Open("mysql", "root:72574484@tcp(127.0.0.1:3306)/PicturePerfect")		// Connecting to Database
			 if err != nil {
				 fmt.Println(err)
				 }else{
				 fmt.Println("Connection Established")
			 }



	var query = "select * from movies  limit 5 " 	// Query string
	fmt.Println(query)
	rows,err:=db.Query(query)

	if err!=nil{
		fmt.Println(err)
	}

	var list movie_list
	var tag movie
	list.Page = 1
	list.Sort = 0
	for rows.Next(){
		
	 err:=rows.Scan(&tag.Id,&tag.Title,&tag.Language,&tag.Release_date,&tag.Poster_path,&tag.Background_path,&tag.Overview,&tag.Genre_ids)
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


// DataList retrieves the content from DB (content can be movies, TV shows or Documentary)

func DataList(w http.ResponseWriter, r *http.Request) {


    queryValues := r.URL.Query()  									// Retrieve all query Parameters from the url


    page,el := strconv.Atoi(queryValues.Get("page"))				// page is an integer, implementing pagination
    if el == nil {
		fmt.Println(el)
	}


	sort,el := strconv.Atoi(queryValues.Get("order"))				// Sort is an integer, where each value decides what type of sort to implement
    if el == nil {
		fmt.Println(el)
	}
	//fmt.Println("hit")
	//fmt.Println("soat",sort)

    enableCors(&w)													// Function to allow CORS


    db, err := sql.Open("mysql", "root:72574484@tcp(127.0.0.1:3306)/PicturePerfect")		// Connecting to Database
			 if err != nil {
				 fmt.Println(err)
				 }else{
				 fmt.Println("Connection Established")
			 }

	var ordquery = ""											// ordquery is string which would be appended to query. It's value would be decided by variable sort
	if sort==1{
		ordquery = "ORDER BY ID"
	}

	if sort==2{
		ordquery = "ORDER BY release_date"
	}

	if sort==3{
		ordquery = "ORDER BY title"
	}
	

	total_page,err := db.Query("select count(*) from movies")				//  Total_page contains result of query to find total number of records in the Database
	if err!=nil{
		 	fmt.Println(err)
		 }


	var page_count total_page_count										
	for total_page.Next(){
		err:=total_page.Scan(&page_count.pages)								// Assigning total number of records to page_count.pages
			 if err != nil {
			 fmt.Println(err)
			}
	}
	if (10*page)>page_count.pages{											// Checking if requested page is less than total page_count, else displaying e
		page = 1
	}

	var query = "select * from movies "+ordquery+" limit 15 offset "+strconv.Itoa((15*(page-1))) 	// Query string
	fmt.Println(query)
	rows,err:=db.Query(query)

	if err!=nil{
		fmt.Println(err)
	}

	var list movie_list
	var tag movie
	list.Page = page
	list.Sort = sort
	for rows.Next(){
		
	 err:=rows.Scan(&tag.Id,&tag.Title,&tag.Language,&tag.Release_date,&tag.Poster_path,&tag.Background_path,&tag.Overview,&tag.Genre_ids)
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
 
func main() {
	handleRequests()

}