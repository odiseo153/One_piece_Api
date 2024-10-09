import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../Interfaces/Characters';
import { Crew } from '../Interfaces/Crew';
import { Fruit } from '../Interfaces/Fruits';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://api.api-onepiece.com/v2/'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.apiUrl}characters/en`);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}characters/en/${id}`);
  }

  getCrews(): Observable<Crew[]> {
    return this.http.get<Crew[]>(`${this.apiUrl}crews/en`);
  }

  getCrew(id: number): Observable<Crew> {
    return this.http.get<Crew>(`${this.apiUrl}crews/en/${id}`);
  }

  getFruits(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(`${this.apiUrl}fruits/en`);
  }

  getFruit(id: number): Observable<Fruit> {
    return this.http.get<Fruit>(`${this.apiUrl}fruits/en/${id}`);
  }

}








