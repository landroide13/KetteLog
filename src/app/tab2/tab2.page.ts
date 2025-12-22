import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { SessionStorageStore } from '../core/services/session-storage.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonLabel, IonList, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonItem]
})
export class Tab2Page {

  sessions: any[] = [];

  constructor(private storage: SessionStorageStore) {}

  async ionViewWillEnter(){
    this.sessions = await this.storage.getSessions();
  }

}
