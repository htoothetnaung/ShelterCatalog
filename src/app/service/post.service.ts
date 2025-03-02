import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient) {}

  addPost(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPost`, formData);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/getPosts');
  }

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/postDetails/${id}`);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletePost/${postId}`);
  }

  updatePost(id: number, postData: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/updatePost/${id}`, postData);
}

  
}
