import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Kette-log-v1',
  webDir: 'www',
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: "Library/CapacitorDatabase",
      electronWindowsLocation: "Dbs/"
    }
  }
};

export default config;
