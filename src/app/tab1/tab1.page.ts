import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonInput, IonButton, IonDatetime, IonDatetimeButton, IonModal, IonLabel, IonItem } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonItem, IonModal, IonDatetimeButton, IonDatetime, 
    IonButton, IonInput, IonRow, IonCol,IonLabel,
    IonHeader, IonToolbar, IonTitle, IonContent, CommonModule,FormsModule],
})
export class Tab1Page {

  exerciseName = '';
  date: string = new Date().toISOString();

  constructor(private router: Router, private platform: Platform) {}

  ionViwWillEnter(){}

  start(){
    this.router.navigate(['/tabs/tab1/session'], {
      state: {
        name: this.exerciseName,
        date: this.date
      }
    });
    this.exerciseName = '';
  }

  isAndroid(){
    return this.platform.is('android');
  }

  onDateChange(ev: any) {
    this.date = ev.detail.value as string;
  }
}
