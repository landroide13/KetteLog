import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { SessionStorageStore } from '../core/services/session-storage.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../core/services/toast-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonBadge, IonIcon, IonLabel, IonList, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonItem]
})
export class Tab2Page {

  sessions: any[] = [];

  constructor(private storage: SessionStorageStore, 
    private router: Router, private toast: ToastService) {}

  async ionViewWillEnter(){
    this.sessions = await this.storage.getSessions();
  }

  openSession(id: number){
    this.router.navigate(['/tabs/tab2/session-details', id]);
  }

}
