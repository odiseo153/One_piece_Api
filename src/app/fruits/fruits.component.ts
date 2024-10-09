import { Component } from '@angular/core';
import { Fruit } from '../Interfaces/Fruits';
import { ApiService } from '../services/api-services.service';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent {
  Fruits: Fruit[] = [];
  fruits: string[] = [];

  filterFruitName: string = '';
  filterFruitType: string = '';
  loading: boolean = false;

  // Variables para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFruits();
  }

  loadFruits(): void {
    this.loading = true;
    this.apiService.getFruits().subscribe(data => {
      this.Fruits = data;
      this.fruits = [...new Set(data.map(fruit => fruit.type || "Without Fruit"))];
      this.updateTotalItems(); // Actualizar el total de elementos cuando los personajes sean cargados
      this.loading = false;
    
    }, error => {
      console.error('Error fetching fruits:', error);
      this.loading = false;
    });
  }

  // Método para filtrar personajes y devolver los de la página actual
  filterFruit(): Fruit[] {
    let data = this.Fruits;
    
    // Filtrar por nombre
    if (this.filterFruitName) {
      data = data.filter(fruit => fruit.name.toLowerCase().includes(this.filterFruitName.toLowerCase()));
    }

    // Filtrar por tipo de fruta
    if (this.filterFruitType) {
      data = data.filter(fruit => fruit.type.toLowerCase() === this.filterFruitType.toLowerCase());
    }

    // Actualizar el total de elementos filtrados
    this.totalItems = data.length;

    // Calcular las frutas para la página actual
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

  getColorByFruitType(type: string): string {
    switch (type.toLowerCase()) {
      case 'paramecia':
        return 'bg-blue-500'; // Azul para Paramecia
      case 'logia':
        return 'bg-red-500'; // Rojo para Logia
      case 'zoan':
        return 'bg-green-500'; // Verde para Zoan
      case 'artificial':
        return 'bg-purple-500'; // Morado para frutas artificiales
      case 'mythical zoan':
        return 'bg-yellow-500'; // Amarillo para Mythical Zoan
      default:
        return 'bg-gray-500'; // Gris para tipos desconocidos
    }
  }
  

  // Actualizar el total de elementos (frutas)
  updateTotalItems(): void {
    this.totalItems = this.Fruits.length;
  }

  // Cuando cambien los filtros, reiniciar la página a la primera
  onFilterChange(): void {
    this.currentPage = 1; // Resetear a la primera página
    this.filterFruit(); // Filtrar personajes y actualizar la paginación
  }
}
