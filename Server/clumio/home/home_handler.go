package home_handler

import (
	"net/http"
	"fmt"
 	_ "github.com/go-sql-driver/mysql"
 	utils "clumio/utilities"
)

// blank function. written for testing :)

func HomePage(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
    fmt.Fprintf(w, "Welcome to the HomePage!")
    fmt.Println("Endpoint Hit: homePage")

}

