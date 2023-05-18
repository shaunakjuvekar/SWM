



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

}