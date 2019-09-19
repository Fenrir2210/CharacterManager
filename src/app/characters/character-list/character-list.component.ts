import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/shared/character.service';
import { Character } from 'src/app/shared/character.model';
import { CharacterComponent } from 'src/app/characters/character/character.component';

import { AngularFirestore } from '@angular/fire/firestore'
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  list: Character[];
  searchText: string = "";
  modalRef: BsModalRef;
  constructor(private service: CharacterService, private firestore: AngularFirestore, private toastr: ToastrService, private modalService: BsModalService) { }

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

  openModal() {
    this.modalRef = this.modalService.show(CharacterComponent);
  }

  onEdit(char:Character) {
    this.modalRef = this.modalService.show(CharacterComponent);
  	this.service.formData = Object.assign({}, char);
  }

  filterCondition(char) {
    return char.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

  onDelete(id:string) {
  	if(confirm("Are you sure you want to delete this character?"))
  	{
  		this.firestore.doc('characters/' + id).delete();
  		this.toastr.warning("Character Deleted", 'Character Manager')  		
  	}
  }

}