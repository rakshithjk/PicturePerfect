package movie_reviews


import (
	"net/http"
	"fmt"
    "strings"
    "encoding/json"
    "database/sql"
 	_ "github.com/go-sql-driver/mysql"
 	"strconv"
 	utils "clumio/utilities"
)


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

type total_page_count struct{
	pages int 
}



//////////////////////////////////////////////////////////////////////////

// Review function is used for getting all reviews 

func DisplayReview(w http.ResponseWriter, r *http.Request){
	utils.EnableCors(&w)


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
	//switch
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



	var query = "select * from movie_reviews where movie_id = "+id+" "+ordquery+" limit 10 offset "+strconv.Itoa((10*(page-1)))
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