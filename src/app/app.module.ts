import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { FruitsComponent } from './fruits/fruits.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { HomeComponent } from './home/home.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CrewsComponent } from './crews/crews.component';
import { CrewDetailComponent } from './crew-detail/crew-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    FruitsComponent,
    LoadingComponent,
    CharacterDetailComponent,
    HomeComponent,
    DocumentationComponent,
    CrewsComponent,
    CrewDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
