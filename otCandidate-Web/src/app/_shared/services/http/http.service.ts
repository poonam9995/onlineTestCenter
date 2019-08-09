import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: string = environment.baseUrl;
  headers: HttpHeaders;
  
  constructor(private http: HttpClient, private router: Router) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    })
  }


  /**
   * for using get method.
   * @param url : url where requei
   * @param params
   */
  get(url: string, params?: object) {
    const apiUrl = `${this.baseUrl}/${url}${this.generateQueryString(params)}`;
    console.log(apiUrl);
    return this.http.get(apiUrl, {
      headers: this.headers
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params 
   */
  put(url: string, data?: any, params?: object) {
    const apiUrl = `${this.baseUrl}/${url}${this.generateQueryString(params)}`;
    console.log(data);
    return this.http.put(apiUrl, data, {
      headers: this.headers
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params 
   */
  post(url: string, data?: any, params?: object) {

    const apiUrl = `${this.baseUrl}/${url}${this.generateQueryString(params)}`;
    console.log(apiUrl);
    return this.http.post(apiUrl, data, {
      headers: this.headers
    });
  }

  /**
   * delete method does not have any body part
   * passes object id as parameter
   * also passes token in header part
   * @param url : url where request will be send
   */
  delete(url: string) {
    const apiUrl = `${this.baseUrl}/${url}`;
    console.log(apiUrl);
    return this.http.delete(apiUrl, {
      headers: this.headers
    });
  }

  /**
   * Helper Method that will generate the queryString.
   * @param params Object to be converted into URLSearchParam.
   */
  generateQueryString(params?: object): string {
    let queryString = '',
      httpParam = new URLSearchParams();
    Object.keys(params || {}).forEach(key => httpParam.set(key, params[key]));
    queryString = httpParam.toString() ? `?${httpParam.toString()}` : '';
    console.log(queryString);
    return queryString;

  }

  /**
   * Helper method to call the GET api for any url.
   * @param url string url that needs to be called.
   */
  simpleGet(url: string) {
    const apiUrl = `${this.baseUrl}/${url}`;
    //console.log(apiUrl);
    return this.http.get(apiUrl);
  }

  /**
   * Helper method to call the POST api for any url.
   * @param url string url that needs to be called.
   * @param data Object data that needs to be passed with API.
   */
  simplePost(url: string, data: any) {
    console.log(url, data);
    const apiUrl = `${this.baseUrl}/${url}`;
    console.log(apiUrl);
    return this.http.post(apiUrl, data);
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  getToken() {
    return localStorage.getItem('token')
  }
  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  
  setMaintain(){
    return localStorage.getItem('resultData');
  }
}
