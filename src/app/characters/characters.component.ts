import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-services.service';
import { Character } from '../Interfaces/Characters';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  character: Character[] = [];
  fruits: string[] = [];
  jobs: string[] = [];

  filterName: string = '';
  filterStatus: string = '';
  filterJob: string = '';
  filterFruitType: string = '';
  loading:boolean = false;


  // Variables para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    this.apiService.getCharacters().subscribe(data => {
      this.character = data;
      this.fruits = [...new Set(data.map(char => char.fruit?.type || "Without Fruit"))];
      this.jobs = [...new Set(data.map(char => char.job || 'No tiene'))];
      this.updateTotalItems(); // Actualizar el total de elementos cuando los personajes sean cargados
      this.loading = false;
    
    }, error => {
      console.error('Error fetching characters:', error);
    });
  }

  // Método para filtrar personajes y devolver los de la página actual
// Método para filtrar personajes y devolver los de la página actual
filterCharacters(): Character[] {
  let data = this.character;
  
  // Filtrar por estado (status)
  if (this.filterStatus != "") {
    data = data.filter(char => char.status && char.status.toLowerCase() === this.filterStatus.toLowerCase());
  }

  // Filtrar por nombre
  if (this.filterName) {
    data = data.filter(char => char.name && char.name.toLowerCase().includes(this.filterName.toLowerCase()));
  }

  // Filtrar por trabajo (job)
  if (this.filterJob) {
    data = data.filter(char => char.job && char.job.toLowerCase().includes(this.filterJob.toLowerCase()));
  }

  // Filtrar por tipo de fruta
  if (this.filterFruitType) {
    if (this.filterFruitType === 'None') {
      data = data.filter(char => !char.fruit || char.fruit?.type === 'None');
    } else {
      data = data.filter(char => char.fruit && char.fruit.type && char.fruit.type.toLowerCase() === this.filterFruitType.toLowerCase());
    }
  }

  // Actualizar el total de elementos filtrados
  this.totalItems = data.length;

  // Calcular los personajes para la página actual
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;

  return data.slice(startIndex, endIndex);
}


  // Cambiar de página y actualizar el contenido mostrado
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  // Calcular el número total de páginas
  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Actualizar el total de elementos (personajes)
  updateTotalItems(): void {
    this.totalItems = this.character.length;
  }

  // Cuando cambien los filtros, reiniciar la página a la primera
  onFilterChange(): void {
    this.currentPage = 1; // Resetear a la primera página
    this.filterCharacters(); // Filtrar personajes y actualizar la paginación
  }

  parseFloat(item:string): Number {
    item = item.replace('cm','');
return Number.parseFloat(item) / 100;
  }


}
