import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionStorageStore } from '../../core/services/session-storage.store';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCol, IonButton, IonFooter, IonItem, IonLabel, IonList, IonListHeader, IonInput, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertService } from 'src/app/core/services/alert-service';
import { ToastService } from 'src/app/core/services/toast-service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
  standalone: true,
  imports: [IonIcon, 
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

  constructor(private router: Router, private platform: Platform, 
    private storage: SessionStorageStore, private alertConf: AlertService,
    private toast: ToastService) {
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

  confirmSave(){
    this.alertConf.alertConfirm(
      'Save Session',
      'Are you sure ?',
      () => this.register()
    )
  }

  async register(){
    const session = {
      name: this.exerciseName,
      date: this.date,
      sets: this.repsList,
      totalReps: this.totalReps
    };
    this.toast.showToast(`Session saved, Total Reps: ${session.totalReps}`, 'top');
    this.router.navigateByUrl('/');
    await this.storage.saveSession(session);
  }

  get totalReps() {
    return this.repsList.reduce((sum, r) => sum + r, 0);
  }

}
