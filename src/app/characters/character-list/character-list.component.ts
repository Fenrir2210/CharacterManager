import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/shared/character.service';
import { Character } from 'src/app/shared/character.model';
import { AngularFirestore } from '@angular/fire/firestore'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  list: Character[];
  constructor(private service: CharacterService, private firestore: AngularFirestore, private toastr: ToastrService) { }

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

  onDelete(id:string) {
  	if(confirm("Are you sure you want to delete this character?"))
  	{
  		this.firestore.doc('characters/' + id).delete();
  	}
  }

}