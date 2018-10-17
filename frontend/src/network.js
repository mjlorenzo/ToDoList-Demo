import axios from 'axios';

// utility functions that handle making network requests

const CSRF_HEADER = "X-CSRFToken";
const AUTH_HEADER = "WWW-Authenticate";
const CSRF_TOKEN_ID = "csrftoken";

// create a custom axios instance to integrate our CSRF implementation
var ourAxios = axios.create({
    xsrfHeaderName: CSRF_HEADER,
    xsrfCookieName: CSRF_TOKEN_ID
});

// utility function to create the authentication header
function makeAuthHeader(token) {
    return {
        headers: {
            AUTH_HEADER: "Token " + token
        }
    }
}

// utility function for sending GET request with Authentication header
export function getAuthenticated(url, token)
{
    return ourAxios.get(url, makeAuthHeader(token));
}

// utility function for sending a POST request
export function post(url, data, extOpts = {})
{
    return ourAxios.post(url, data, extOpts);
}

// utility function for sending a POST request with an authentication token
export function postAuthenticated(url, data, token) {
    return ourAxios.post(url, data, makeAuthHeader(token));
}

// same for DELETE requests
export function deleteAuthenticated(url, token) {
    return ourAxios.delete(url, makeAuthHeader(token));
}

// patch
export function patchAuthenticated(url, data, token) {
    return ourAxios.patch(url, data, makeAuthHeader(token));
}

// put
export function putAuthenticated(url, data, token) {
    return ourAxios.patch(url, data, makeAuthHeader(token));
}