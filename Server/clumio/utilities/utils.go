package utils

import (
	"net/http"
	"github.com/gorilla/mux"
)


func EnableCors(w *http.ResponseWriter) {											// Function to enable CORS
	(*w).Header().Set("Access-Control-Allow-Origin", "*")

}


// posterfunc is for obtaining the url of the poster images which would be stored in a different location

func Posterfunc(w http.ResponseWriter, r *http.Request){
    w.Header().Set("Content-Type", "image/jpeg")
    vars := mux.Vars(r)
    key := vars["id"]
    var url = "/home/rakshithjk/go/src/clumio/images/"+key
    //url = "/home/rakshithjk/go/src/clumio/images/3TpMBcAYH4cxCw5WoRacWodMTCG.jpg"
    http.ServeFile(w, r, url)
}