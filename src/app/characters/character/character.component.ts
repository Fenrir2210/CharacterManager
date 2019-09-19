import { Component, OnInit } from '@angular/core';
import { CharacterService} from 'src/app/shared/character.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import {ToastrService } from 'ngx-toastr';

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
  	let data = form.value;
  	this.firestore.collection('characters').add(data);
  	this.resetForm(form);
  	this.toastr.success("Submission Successful", 'Character Manager')
  }

}
