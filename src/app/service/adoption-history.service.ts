import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionHistoryService {
  private baseUrl = 'http://localhost:8081/api/adoptionHistory';


  constructor(private http: HttpClient) { }
  
  getAllHistory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAll`);
  }
}
