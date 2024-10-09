import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
  cards = [
    { 
      image: "https://ih1.redbubble.net/image.4155785074.7045/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg", 
      name: "Characters", 
      url: "/characters" 
    },
    { 
      image: "https://www.shutterstock.com/image-vector/gomu-no-mi-hito-model-600nw-2389044881.jpg", 
      name: "Fruits", 
      url: "/fruits" 
    },
    { 
      image: "https://cdn.iconscout.com/icon/premium/png-256-thumb/pirate-crew-2179591-1824298.png", 
      name: "Crews", 
      url: "/crews" 
    },
    { 
      image: "https://static.vecteezy.com/system/resources/previews/006/484/737/original/pirate-ship-icon-illustration-free-vector.jpg", 
      name: "Ships", 
      url: "https://example.com/error-handling" 
    }
  ];



}
