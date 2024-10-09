import { Component, OnInit } from '@angular/core';
import { Character } from '../Interfaces/Characters';
import { Fruit } from '../Interfaces/Fruits';
import { Crew } from '../Interfaces/Crew'; // Asumimos que tienes una interfaz para la tripulación
import { ApiService } from '../services/api-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
   character!: Character;
   loading:boolean = false;
   id:number = 0; // Inicializado a 0 para evitar un valor predeterminado


  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    this.apiService.getCharacter(this.id).subscribe(data => {
      this.character = data;
      this.loading = false;
      console.log(data);
    }, error => {
      console.error('Error fetching characters:', error);
    });
  }


  getColorByFruitType(type: string): string {
    switch (type.toLowerCase()) {
      case 'paramecia':
        return 'bg-blue-500';
      case 'logia':
        return 'bg-red-500';
      case 'zoan':
        return 'bg-green-500';
      case 'artificial':
        return 'bg-purple-500';
      case 'mythical zoan':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  }

  parseFloat(item:string): Number {
    item = item.replace('cm','');
    return Number.parseFloat(item) / 100;
  }

  
}
