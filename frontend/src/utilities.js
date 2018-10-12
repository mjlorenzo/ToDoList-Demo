import { readCookie } from "./cookies";
import { changeCSRF } from './actions';

// file to hold various utility functions

const CSRF_HEADER = "X-CSRFToken";
const AUTH_HEADER = "WWW-Authenticate";
const CSRF_TOKEN_ID = "csrftoken";

// utility function for sending GET request with Authentication header
export function getAuthenticated(url, token)
{
    return fetch(url,
        {
            headers: {
                AUTH_HEADER: "Token " + token
            }
        });
}

// utility function for sending a POST request as form-data
export function postFormData(url, data, extOpts = {})
{
    return fetch(url,
        {
            method: "POST",
            body: data,
            ...extOpts
        });
}

// utility function for posting data with a CSRF token
export function postFormDataCSRF(url, data, csrf, extHeaders = {}, extOpts = {})
{
    return postFormData(url, data,
        {
            headers: {
                [CSRF_HEADER]: csrf,
                ...extHeaders
            },
            ...extOpts
        });
}

// utility function for posting form data with full authentication
export function postFormDataFullAuth(url, data, token, csrf)
{
    return postFormDataCSRF(url, data, csrf,
        {
            [AUTH_HEADER]: "Token " + token
        });
}


// utility function for sending a POST request with JSON encoded data
export function postJSON(url, data, extHeaders = {}, extOpts = {})
{
    // returns a promise to match expected fetch API behavior
    return fetch(url,
        {
            //
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                ...extHeaders
            },
            body: JSON.stringify(data),
            ...extOpts
        });
}

// utility function for sending a POST request with JSON data and an authorization token
export function postJSONWithToken(url, data, token, extHeaders = {}, extOpts = {}) 
{
    return postJSON(url, data,
        {
            [AUTH_HEADER]: "Token " + token,
            ...extHeaders
        }, extOpts);
}

export function postJSONFullAuth(url, data, token, csrf) {
    return postJSONWithToken(url, data, token,
        {
            [CSRF_HEADER]: csrf
        });
}

export function updateCSRF(dispatch) {
    var csrf = readCookie(CSRF_TOKEN_ID);
    dispatch(changeCSRF(csrf));
}