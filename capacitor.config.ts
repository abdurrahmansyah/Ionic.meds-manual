import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.meds.medsmanual',
  appName: 'Meds Manual',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
