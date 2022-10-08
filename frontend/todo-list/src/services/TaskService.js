const DEFAULT_URL = 'http://localhost:8080/servlet-api/'

const httpMethods = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE'
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

const getByDescription = (description) => {
    
    return fetch(DEFAULT_URL, {
        method: httpMethods.get,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description   
        }),
    }).then(async (response) => {
        const data = await response.json();
        return data;
    });
};

const getByName = (name) => {
    
    return fetch(DEFAULT_URL, {
        method: httpMethods.get,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name   
        }),
    }).then(async (response) => {
        const data = await response.json();
        return data;
    });
};

const getByPendding = (status) => {
    
    return fetch(DEFAULT_URL, {
        method: httpMethods.get,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status   
        }),
    }).then(async (response) => {
        const data = await response.json();
        return data;
    });
};

const getByDone = (status) => {
    
    return fetch(DEFAULT_URL, {
        method: httpMethods.get,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status   
        }),
    }).then(async (response) => {
        const data = await response.json();
        return data;
    });
};

export default {
    getByID,
    getByPendding,
    getByDone,
    getByDescription,
    getByPendding
}