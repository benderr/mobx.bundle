import Q from 'q';
import axios from 'axios'

export default class Http {
    constructor(interceptors){
        this.interceptors = interceptors;
    }

    http(params){
        return this.interceptors.apply(Q(normalizeHttpOptions(params)), serverRequest);
    }
}

function serverRequest(params) {
    return Q.Promise(function (resolve, reject, notify) {
        axios(params)
            .then(resolve, reject, notify);
    });
}

function normalizeHttpOptions(params) {
    params.headers = params.headers || {};
    if (params.method === 'GET' && params.data){
        params.params = params.data;
        delete params.data;
    }
    return params;
}
