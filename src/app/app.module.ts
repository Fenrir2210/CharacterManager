import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire"
import { AngularFirestoreModule } from "@angular/fire/firestore"
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CharactersComponent } from './characters/characters.component';
import { CharacterComponent } from './characters/character/character.component';
import { CharacterListComponent } from './characters/character-list/character-list.component'
import { CharacterService} from './shared/character.service';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterComponent,
    CharacterListComponent
  ],
  imports: [
  	BrowserModule,
  	AngularFireModule.initializeApp(environment.firebaseConfig),
  	AngularFirestoreModule,
  	FormsModule,
  	BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  	ToastrModule.forRoot()  	
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent],
  entryComponents: [CharacterComponent]
})
export class AppModule { }
