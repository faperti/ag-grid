export class RigaMenuModel {
    // tslint:disable-next-line:variable-name
    id_utente: string;
    Utente: string;
    Password: string;
    // tslint:disable-next-line:variable-name
    Des_Utente: string;
    Livello: string;
    GeneraCertificatiReali: string;
    GeneraCertificatiClienti: string;
    VediCertificatiInterni: boolean;
    VediCertificatiClienti: boolean;
    VediCertificatiClientiChiusi: boolean;
    VediCertificatiClientiCommerciali: boolean;
    Manutenzione: boolean;
    bAlter: boolean;
    Attivo: boolean;
    Descrizione: string;
    MenuValue: string;
    descrizione: string;
    MIDescrizione: string;
    MIMenuValue: string;
}

export class Menu {
    idMenu: string;
    DescrizioneMenu: string;
    VociMenu: VoceMenu[];
}

export class VoceMenu {
    idVoceMenu: string;
    DescrizioneVoceMenu: string;
    MenuValue: string;
    Routing: string;
}







