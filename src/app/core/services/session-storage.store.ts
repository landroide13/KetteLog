import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteResult, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageStore {

  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  constructor(private toast: ToastService) {}

   // Create tables if they do not exist
  private readonly sql = `
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        date TEXT,
        totalReps INTEGER
      );

      CREATE TABLE IF NOT EXISTS session_sets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER,
        reps INTEGER,
        FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
      );
    `;

  async init() {
    console.log('Init..DB');

    try{

      this.db = await this.sqlite.createConnection('kettlebellDB', false, 'no-encryption', 1, false);

      await this.db.open();

      await this.db.execute(this.sql);

      this.toast.showToast(`DB created`, 'bottom');

    }catch(err){
      this.toast.showToast(`DB created: ${err}`, 'bottom');
    }

    
  }

  async saveSession(session: { name: string; date: string; totalReps: number; sets: number[] }) {
    // Insert into sessions table
    const sessionSQL = `
      INSERT INTO sessions (name, date, totalReps)
      VALUES (?, ?, ?);
    `;
    await this.db.run(sessionSQL, [session.name, session.date, session.totalReps]);

    // Get last inserted session id
    const result = await this.db.query('SELECT last_insert_rowid() as id;');
    const sessionId = result.values![0].id;

    // Insert each set
    for (let reps of session.sets) {
      await this.db.run(
        `INSERT INTO session_sets (session_id, reps) VALUES (?, ?);`,
        [sessionId, reps]
      );
    }
  }

  // Fetch all sessions
  async getSessions() {
    const query = `SELECT * FROM sessions ORDER BY date DESC;`;
    const result = await this.db.query(query);
    return result.values || [];
  }

  // Fetch sets for a given session
  async getSessionSets(sessionId: number) {
    await this.ensureDB();
    const query = `SELECT * FROM session_sets WHERE session_id = ?;`;
    const result = await this.db.query(query, [sessionId]);
    return result.values || [];
  }

  async close() {
    await this.sqlite.closeConnection('kettlebellDB', false);
  }

  async ensureDB() {
    if (!this.db) {
      await this.init();
    }
  }

}
