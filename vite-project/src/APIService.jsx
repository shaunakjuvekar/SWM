import { baseURL } from "./constants";


export default class APIService{
    // Insert an article
    static InsertArticle(body){
        return fetch(`${baseURL.sweep}/add`,{   // http://localhost:5002
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

    static sendCompleteData(body){
        return fetch(`${baseURL.sweep}/send`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

    static getRoutes(){
        return fetch(`${baseURL.sweep}/get_data`,{   
            'method':'GET',
             headers : {
            'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }


    static getRouteTables(){
        console.log("getRouteTables() called")
        return fetch(`${baseURL.sweep}/get_route_tables`,{
            'method':'GET',
             headers : {
                'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

    static getLocationData(){
        console.log("getLocationData() called")
        return fetch(`${baseURL.sweep}/get_location_data`,{
            'method':'GET',
             headers : {
                'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

    static getAllCoordinates(){
        console.log("getAllCoordinates() called")
        return fetch(`${baseURL.sweep}/get_coordinates`,{
            'method':'GET',
             headers : {
                'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

    static sendLocationData(body){
        console.log(body)
        return fetch(`${baseURL.sweep}/get_csv_and_compute`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }


    static getSummaryTables(){
        console.log("getSummaryTables() called")
        return fetch(`${baseURL.sweep}/get_summary_tables`,{
            'method':'GET',
             headers : {
                'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }


}