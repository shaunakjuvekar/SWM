
export default class APIService{
    // Insert an article
    static InsertArticle(body){
        return fetch(`http://localhost:5002/add`,{
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
        return fetch(`http://localhost:5002/send`,{
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
        return fetch(`http://localhost:5002/get_data`,{
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
        return fetch(`http://localhost:5002/get_route_tables`,{
            'method':'GET',
             headers : {
                'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

    static getSummaryTables(){
        console.log("getSummaryTables() called")
        return fetch(`http://localhost:5002/get_summary_tables`,{
            'method':'GET',
             headers : {
                'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }


}