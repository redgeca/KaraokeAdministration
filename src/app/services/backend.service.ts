import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Artist } from '../interfaces/artist';
import { Observable } from 'rxjs'; 
import { Category } from '../interfaces/category';
import {  Song } from '../interfaces/song';

let jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
const baseUrl = 'http://drague.karaoke:81/api';
const artistUrl = baseUrl + '/KaraokeArtists';
const categoryUrl = baseUrl + '/KaraokeCategories';
const songUrl =  baseUrl + '/KaraokeSongs';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  constructor(private http : HttpClient) { }

  getArtists(filter='', orderBy='', page=1, pageSize=10) {
    let parameters = new HttpParams()
      .set('filter', filter)
      .set('orderBy', orderBy)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Artist[]>(artistUrl, {
      params: parameters, observe: 'response', headers: jsonHeader
    });
  }

  getSongs(filter='', orderBy='', page=1, pageSize=10) {
    let parameters = new HttpParams()
      .set('filter', filter)
      .set('orderBy', orderBy)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    const options = { params: parameters, headers: jsonHeader }; 
    return this.http.get<Song[]>(songUrl, options)
  }

  getCategories(filter='', orderBy='', page=1, pageSize=10) {
    let parameters = new HttpParams()
      .set('filter', filter)
      .set('orderBy', orderBy)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    const options = { params: parameters, headers: jsonHeader }; 
    return this.http.get<Category[]>(categoryUrl, options)
  }

  getArtist(id) {
      return this.http.get<Artist>(artistUrl + '/' + id);
  }

}
