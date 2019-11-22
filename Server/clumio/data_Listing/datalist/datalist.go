package datalist

import (
	"net/http"
	"fmt"
    "encoding/json"
    "database/sql"
 	_ "github.com/go-sql-driver/mysql"
 	utils "clumio/utilities"
    "strconv"
)



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


// DataList retrieves the content from DB (content can be movies, TV shows or Documentary)

func DataList(w http.ResponseWriter, r *http.Request) {


    queryValues := r.URL.Query()                                    // Retrieve all query Parameters from the url


    page,el := strconv.Atoi(queryValues.Get("page"))                // page is an integer, implementing pagination
    if el == nil {
        fmt.Println(el)
    }


    sort,el := strconv.Atoi(queryValues.Get("order"))               // Sort is an integer, where each value decides what type of sort to implement
    if el == nil {
        fmt.Println(el)
    }
    //fmt.Println("hit")
    //fmt.Println("soat",sort)

    utils.EnableCors(&w)                                                    // Function to allow CORS


    db, err := sql.Open("mysql", "root:72574484@tcp(127.0.0.1:3306)/PicturePerfect")        // Connecting to Database
             if err != nil {
                 fmt.Println(err)
                 }else{
                 fmt.Println("Connection Established")
             }

    var ordquery = ""                                           // ordquery is string which would be appended to query. It's value would be decided by variable sort
    if sort==1{
        ordquery = "ORDER BY ID"
    }

    if sort==2{
        ordquery = "ORDER BY release_date"
    }

    if sort==3{
        ordquery = "ORDER BY title"
    }
    

    total_page,err := db.Query("select count(*) from movies")               //  Total_page contains result of query to find total number of records in the Database
    if err!=nil{
            fmt.Println(err)
         }


    var page_count total_page_count                                     
    for total_page.Next(){
        err:=total_page.Scan(&page_count.pages)                             // Assigning total number of records to page_count.pages
             if err != nil {
             fmt.Println(err)
            }
    }
    if (10*page)>page_count.pages{                                          // Checking if requested page is less than total page_count, else displaying e
        page = 1
    }

    var query = "select * from movies "+ordquery+" limit 15 offset "+strconv.Itoa((15*(page-1)))    // Query string
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