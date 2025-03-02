import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Import environment

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private baseUrl =`http://localhost:8081`//this is BaseURL 


  private apiUrl = `${environment.backend1Url}/getPosts`; 
  private apiUrlById = `${environment.backend1Url}/postDetails`; 
  
  private apiUrlUser = environment.backend2Url;

  http = inject(HttpClient);

  getPets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getPosts`);
  }

  getPetsFromUserDB(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/userPosts/getPosts`);
  }

  getPetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/postDetails/${id}`);
  }

  getPetByIdFromUserDB(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/userPosts/postDetails//${id}`);
  }
}

export default provideHttpClient();
