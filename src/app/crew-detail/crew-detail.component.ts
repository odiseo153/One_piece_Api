import { Component, OnInit } from '@angular/core';
import { Character } from '../Interfaces/Characters';
import { Crew } from '../Interfaces/Crew';
import { ApiService } from '../services/api-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crew-detail',
  templateUrl: './crew-detail.component.html',
  styleUrls: ['./crew-detail.component.css']
})
export class CrewDetailComponent implements OnInit {
  characters: Character[] = [];
  crew!: Crew;
  loading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;

  filterName: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const crewId = this.route.snapshot.params['id'];
    if (crewId) {
      this.crew = { id: crewId } as Crew;  // Inicializa solo el ID
      this.loadCrew();
    } else {
      console.error('No crew ID provided in route parameters.');
    }
  }

  loadCrew(): void {
    this.loading = true;

    // Fetch crew details
    this.apiService.getCrew(this.crew.id).subscribe(
      (data: Crew) => {
        this.crew = data;
        this.updateTotalItems();
      },
      error => this.handleError('Error fetching crew details:', error)
    );

    // Fetch crew characters
    this.apiService.getCharacters().subscribe(
      (data: Character[]) => {
        this.characters = data.filter(character => character.crew?.id === this.crew.id);
        this.updateTotalItems();
      },
      error => this.handleError('Error fetching characters:', error)
    );
  }

  filterCharacter(): Character[] {
    let filteredCharacters = this.characters;

    // Filter by name if provided
    if (this.filterName.trim()) {
      const searchName = this.filterName.toLowerCase();
      filteredCharacters = filteredCharacters.filter(character => 
        character.name.toLowerCase().includes(searchName)
      );
    }

    this.totalItems = filteredCharacters.length;

    // Paginate filtered results
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredCharacters.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updateTotalItems(): void {
    this.totalItems = this.characters.length;
  }

  onFilterChange(): void {
    this.currentPage = 1; // Reset to first page on filter change
    this.filterCharacter(); // Update displayed characters
  }

  parseFloat(value: string): number {
    return parseFloat(value.replace('cm', '')) / 100;
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.loading = false;
  }
}
