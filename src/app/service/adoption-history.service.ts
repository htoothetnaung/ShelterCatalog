import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdoptionHistoryService {
  private baseUrl = `${environment.backend1Url}/api/adoptionHistory`;


  constructor(private http: HttpClient) { }
  
  getAllHistory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAll`);
  }
}
