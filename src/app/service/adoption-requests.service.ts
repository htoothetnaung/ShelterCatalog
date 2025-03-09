import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestsService {
  private baseUrl = `${environment.backend1Url}/api/applicationForm`;

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllForms`);
  }

  updateRequestStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, { status });
  }

  getApplicationDetails(id: number) {
    return this.http.get<any>(`${this.baseUrl}/details/${id}`);
  }

  deleteRequest(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }

  adoptPet(applicationId: number, adopterEmail: string) {
    return this.http.post(`${this.baseUrl}/adopt/${applicationId}`, adopterEmail);
  }
  
}
