import { environment } from "src/environments/environment";
export var dataTemp = {
    // urlHit: environment.production ? 'https://kip.hutamakarya.com/api/' :  'http://kipdev.hutamakarya.com/',
    urlHit: environment.production ? 'https://ppid.hutamakarya.com/api/' : 'https://ppiddev.hutamakarya.com/api/',
    route: {
        'detail': '/tabs/detail',
        'asesmen': '/tabs/asesmen',
        'triase': '/tabs/asesmen/triase',
        'surveiPrimer': '/tabs/asesmen/survei-primer',
        'surveiSekunder': '/tabs/asesmen/survei-sekunder',
        'tandaVital': '/tabs/asesmen/tanda-vital',
        'asesmenDetail': '/tabs/asesmen/asesmen-detail',
        'penunjang': '/tabs/penunjang',
        'radioimaging': '/tabs/penunjang/radioimaging',
        'nilaiNormalLab': '/tabs/penunjang/nilai-normal-lab',
        'ekg': '/tabs/penunjang/ekg',
        'penunjangDetail': '/tabs/penunjang/penunjang-detail',
        'panduan': '/tabs/panduan',
        'panduanDetail': '/tabs/panduan/panduan-detail',
        'obat': '/tabs/obat',
    },
    tab: {
        'asesmen': 'asesmen',
        'triase': 'triase',
        'triaseChild': 'triase-child',
        'surveiPrimer': 'survei-primer',
        'surveiSekunder': 'survei-sekunder',
        'tandaVital': 'tanda-vital',
        'penunjang': 'penunjang',
        'radioimaging': 'radioimaging',
        'nilaiNormalLab': 'nilai-normal-lab',
        'ekg': 'ekg',
        'panduan': 'panduan',
        'obat': 'obat',
        'profil': 'profil',
        'admin': 'admin',
        'master': 'master',
        'createEditMaster': 'create-edit-master',
    },
    title: {
        'triase': 'Triase',
        'surveiPrimer': 'Survei Primer',
        'surveiSekunder': 'Survei Sekunder',
        'tandaVital': 'Tanda Vital',
        'radioimaging': 'Radioimaging',
        'nilaiNormalLab': 'Nilai Normal Laboratorium',
        'ekg': 'Elektrokardiografi',
    },
    aksi: {
        'create': 'create',
        'edit': 'edit',
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
        'editMaster': 'edit-master',
    },
    subCategory: {
        'text': 'text',
        'sub': 'sub',
        'subsub': 'subsub',
        'img': 'img',
        'ref': 'ref',
        'btn': 'btn',
        'audio': 'audio',
    },
    subCategoryString: {
        'text': 'Teks',
        'sub': 'Sub Judul',
        'subsub': 'Sub Sub Judul',
        'img': 'Image',
        'ref': 'Referensi',
        'btn': 'Button',
        'audio': 'Audio',
    },
    audio: {
        'auskultasiNormalVesikuler': 'auskultasi-normal-vesikuler',
        'crackles': 'crackles',
        'pleuralRub': 'pleural-rub',
        'stridor': 'stridor',
        'wheezing': 'wheezing',
        'suaraJantungNormal': 'suara-jantung-normal',
        'suaraS3': 'suara-s3',
        'suaraS4': 'suara-s4',
        'murmurBenign': 'murmur-benign',
        'lateArterialStenosis': 'late-arterial-stenosis',
        'pulmonicStenosis': 'pulmonic-stenosis',
        'mitralRegurgitation': 'mitral-regurgitation',
        'patentDuctusArteriosus': 'patent-ductus-arteriosus',
        'ventricularSeptalDefect': 'ventricular-septal-defect',
        'atrialSeptalDefect': 'atrial-septal-defect',
        'aorticRegurgitation': 'aortic-regurgitation',
        'mitralStenosis': 'mitral-stenosis',
    },
    bagian: {
        'asesmen': 'Asesmen',
        'penunjang': 'Penunjang',
        'panduan': 'Panduan',
        'obat': 'Obat',
    },
}