import { Component, OnInit } from '@angular/core';
import { Crew } from '../Interfaces/Crew';
import { ApiService } from '../services/api-services.service';

@Component({
  selector: 'app-crews',
  templateUrl: './crews.component.html',
  styleUrls: ['./crews.component.css']
})
export class CrewsComponent implements OnInit {
  crews: Crew[] = [];
  loading: boolean = false;

  // Variables para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;

  // Variables para los filtros
  filterName: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCrew();
  }

  loadCrew(): void {
    this.loading = true;
    this.apiService.getCrews().subscribe(
      data => {
        this.crews = data;
        this.updateTotalItems(); // Actualizar el total de elementos cuando los datos sean cargados
        this.loading = false;
      },
      error => {
        console.error('Error fetching crews:', error);
        this.loading = false;
      }
    );
  }

  // Método para filtrar y devolver los elementos de la página actual
  filterCrews(): Crew[] {
    let data = this.crews;

    // Filtrar por nombre
    if (this.filterName) {
      data = data.filter(crew => crew.name.toLowerCase().includes(this.filterName.toLowerCase()));
    }


    
    // Actualizar el total de elementos filtrados
    this.totalItems = data.length;

    // Calcular los elementos para la página actual
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

  // Actualizar el total de elementos (crews)
  updateTotalItems(): void {
    this.totalItems = this.crews.length;
  }

  // Cuando cambien los filtros, reiniciar la página a la primera
  onFilterChange(): void {
    this.currentPage = 1; // Reiniciar a la primera página
    this.filterCrews(); // Filtrar elementos y actualizar la paginación
  }

  // Convertir string a número (en metros) eliminando el 'cm' y dividiendo por 100
  parseFloat(item: string): number {
    return Number.parseFloat(item.replace('cm', '')) / 100;
  }
}
