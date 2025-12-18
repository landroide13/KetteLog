import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol, IonButton, IonFooter, IonItem, IonLabel, IonList, IonListHeader, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
  standalone: true,
  imports: [
    IonFooter, IonButton, IonCol, IonBackButton, IonButtons, IonItem, IonList, IonLabel,
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput,
    IonListHeader
]
})
export class SessionPage {

  exerciseName = '';
  date = '';
  repsList: number[] = [];
  repsInput: number | null = null;

  constructor(private router: Router, private platform: Platform) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    console.log("State: " + state)
    if (state) {
      this.exerciseName = state['name'];
      this.date = state['date'];
    }
  }

  ionViewWillEnter(){}

  addSet() {
    if (this.repsInput && this.repsInput > 0) {
      this.repsList.push(this.repsInput);
      this.repsInput = null;
    }
  }

  isAndroid(){
    return this.platform.is('android');
  }

  register(){
    this.router.navigateByUrl('/');
  }

  get totalReps() {
    return this.repsList.reduce((sum, r) => sum + r, 0);
  }

}
