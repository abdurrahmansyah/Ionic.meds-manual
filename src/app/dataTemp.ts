import { environment } from "src/environments/environment";
export var dataTemp = {
    // urlHit: environment.production ? 'https://kip.hutamakarya.com/api/' :  'http://kipdev.hutamakarya.com/',
    urlHit: environment.production ? 'https://ppid.hutamakarya.com/api/' : 'https://ppiddev.hutamakarya.com/api/',
    tab: {
        'asesmen': 'asesmen',
        'penunjang': 'penunjang',
        'panduan': 'panduan',
        'obat': 'obat',
        'profil': 'profil',
    },
    icon: {
        'urlIconAsesmen': '/assets/icons/asesmen.svg',
        'urlIconAsesmenSelected': '/assets/icons/asesmen-selected.svg',
        'urlIconPenunjang': '/assets/icons/penunjang.svg',
        'urlIconPenunjangSelected': '/assets/icons/penunjang-selected.svg',
        'urlIconPanduan': '/assets/icons/panduan.svg',
        'urlIconPanduanSelected': '/assets/icons/panduan-selected.svg',
        'urlIconObat': '/assets/icons/obat.svg',
        'urlIconObatSelected': '/assets/icons/obat-selected.svg',
        'urlIconProfil': '/assets/icons/profil.svg',
        'urlIconProfilSelected': '/assets/icons/profil-selected.svg',
    },
    log: {
        'login': 'login',
        'logout': 'logout',
        'register': 'register',
        'subscibe': 'subscibe',
        'browse': 'browse',
        'search': 'search',
    },
}