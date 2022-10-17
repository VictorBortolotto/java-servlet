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

export function updateTaskName(id, task){

    const headers = new Headers({
        "Content-Type": "application/json"
    })

    const request = {
        method: httpMethods.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(task)
    };

    return fetch(DEFAULT_URL + `servlet/api/update-task-name?id=${id}`, request).then(response => response.json())

}

export function updateTaskDescription(id, task){

    const headers = new Headers({
        "Content-Type": "application/json"
    })

    const request = {
        method: httpMethods.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(task)
    };

    return fetch(DEFAULT_URL + `servlet/api/update-task-description?id=${id}`, request).then(response => response.json())

}

export function updateToDone(id){

    const headers = new Headers({
        "Content-Type": "application/json"
    })

    const request = {
        method: httpMethods.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    return fetch(DEFAULT_URL + `servlet/api/update-to-done?id=${id}`, request).then(response => response.json())

}

export function updateToPending(id){

    const headers = new Headers({
        "Content-Type": "application/json"
    })

    const request = {
        method: httpMethods.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    };

    return fetch(DEFAULT_URL + `servlet/api/update-to-done?id=${id}`, request).then(response => response.json())

}
