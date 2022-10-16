const DEFAULT_URL = 'http://localhost:8080/servlet-api/'

const httpMethods = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE'
}

export function save(task) {
    const headers = new Headers({
        "Content-Type": "application/json"
    })

    const request = {
        method: httpMethods.post,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(task)
    };

    return fetch(DEFAULT_URL + `/servlet/api/new-task`, request).then(response => response.json())
}

export function getAllTasks(){

    const headers = new Headers({
        "Content-Type": "application/json"
    })

    const request = {
        method: httpMethods.get,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    return fetch(DEFAULT_URL + `servlet/api/tasks`, request).then(response => response.json())

}   

export function getByStatus(status){

    const headers = new Headers({
        "Content-Type": "application/json"
    })

    const request = {
        method: httpMethods.get,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    return fetch(DEFAULT_URL + `servlet/api/tasks-by-status?status=${status}`, request).then(response => response.json())

}   

const getByID = (id) => {
    
    const headers = new Headers({
        "Content-Type": "application/json"
    });
    const request = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };
    return fetch(DEFAULT_URL + `servlet/api/task?id=${id}`, request).then(response => { 
        let data = null;
        response.text().then(res => {
            data = res;
            data = data.replace("null", "");
            data = JSON.parse(data);
        }).catch(e => {
            console.log("ERRO: " + e);
        })
        return data;
    });
};
