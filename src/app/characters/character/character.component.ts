import { Component, OnInit } from '@angular/core';
import { CharacterService} from 'src/app/shared/character.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  constructor(private service : CharacterService, private firestore:AngularFirestore, private toastr:ToastrService) { }

  ngOnInit() {
  	this.resetForm();
  }

  resetForm(form? : NgForm)
  {
  	if(form!= null)
  		form.resetForm();
  	this.service.formData = {
  		id : null,
		name: '',
		class: '',
		level: ''  		
  	}
  }

  onSubmit(form:NgForm)
  {
  	let data = Object.assign({}, form.value);
  	delete data.id; //We need the id to be able to keep track of individual employees, but we dont *actually* need to edit the id so just trash it
  	if(form.value.id == null) //If there is no character like this yet, add it to our database
  		this.firestore.collection('characters').add(data);
  	else //else we are editing a pre existing character and we want to update it, sans-id
  		this.firestore.doc('characters/' + form.value.id).update(data);

  	this.resetForm(form);
  	this.toastr.success("Submission Successful", 'Character Manager')
  }

}
