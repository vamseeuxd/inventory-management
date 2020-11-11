import {Component, HostListener, ViewChild} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {AngularFirestoreDocument} from '@angular/fire/firestore/document/document';
import {MatMenuTrigger} from '@angular/material/menu';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMenuOpened = false;



}
