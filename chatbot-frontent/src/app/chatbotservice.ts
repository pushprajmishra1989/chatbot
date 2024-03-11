import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private apiUrl = 'http://127.0.0.1:5000/chatbot';

  constructor(private http: HttpClient) { }

  sendMessage(message: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, message);
  }
}
