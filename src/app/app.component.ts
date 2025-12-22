import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SessionStorageStore } from './core/services/session-storage.store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  
  constructor(private sqliteService: SessionStorageStore) {}

  async ngOnInit(){
     await this.sqliteService.init();
  }
}
