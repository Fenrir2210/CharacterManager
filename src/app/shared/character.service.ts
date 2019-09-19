import { Injectable } from '@angular/core';
import { Character } from './character.model';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
	formData : Character;

  constructor(private firestore:AngularFirestore) { }

  getCharacters()
  {
  	return this.firestore.collection('characters').snapshotChanges(); //returns an observable from our database
  }
}
