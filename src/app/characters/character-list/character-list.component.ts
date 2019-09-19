import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/shared/character.service';
import { Character } from 'src/app/shared/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  list: Character[];
  constructor(private service: CharacterService) { }

  ngOnInit() {
  	this.service.getCharacters().subscribe(actionArray => {
  		this.list = actionArray.map(item => {
  			return {
  				id: item.payload.doc.id,
  				...item.payload.doc.data() 
  			} as Character;
  		})
  	});
  }

  onEdit(char:Character) {
  	this.service.formData = Object.assign({}, char);
  }

}