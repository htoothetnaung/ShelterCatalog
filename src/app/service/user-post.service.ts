import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {
  private baseUrl = `${environment.backend1Url}/api/userPosts`; 
  private apiUrl = `${environment.backend1Url}/api/userPosts/getPostsByUser`;

  constructor(private http: HttpClient) {}

  getUserPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getPostsByUser/${userId}`);
  }
  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/postDetails/${id}`);
  }
  addPost(postData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addPost`, postData);
  }
  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}/deletePost/${id}`, { responseType: 'text' });
  }
  updatePost(id: number, postData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatePost/${id}`, postData);
  }
  
  // from admin interface
  getPostsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }
}
