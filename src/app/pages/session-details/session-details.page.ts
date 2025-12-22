import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonListHeader, IonItem, IonLabel, IonBadge, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageStore } from 'src/app/core/services/session-storage.store';
import { AlertService } from 'src/app/core/services/alert-service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.page.html',
  styleUrls: ['./session-details.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonBadge, IonLabel, IonItem, IonListHeader, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SessionDetailsPage implements OnInit {

  session: any = null;
  sets: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sqlite: SessionStorageStore,
    private router: Router,
    private alert: AlertService
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const db = await this.sqlite.getDB();

    const sessionResult = await db.query(
      'SELECT * FROM sessions WHERE id = ?',
      [id]
    );
    this.session = sessionResult.values?.[0];

    const setsResult = await db.query(
      'SELECT * FROM session_sets WHERE session_id = ?',
      [id]
    );
    this.sets = setsResult.values ?? [];
  }

  confirmDelete(){
    this.alert.alertConfirm(
      'Delete Session',
      'Are you sure ?',
      () => this.deleteSession()
    )
  }

  async deleteSession() {
    const db = await this.sqlite.getDB();

    await db.run(
      "DELETE FROM session_sets WHERE session_id = ?",
      [this.session.id]
    );

    await db.run(
      "DELETE FROM sessions WHERE id = ?",
      [this.session.id]
    );

    console.log("Session deleted");

    this.router.navigate(['/tabs/tab2']);
  }

}
