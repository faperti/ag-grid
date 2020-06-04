export class AccodaStampeResult {
    richiesteInviate: number;
    richiesteOK: number;
    richiesteKO: number;
    dettaglioGenerazione: DettaglioGenerazione[];
}

export class DettaglioGenerazione {
    idGenerazione: number;
    result: boolean;
    dettagli: Dettagli[];
}

export class Dettagli {
    idGenerazione: number;
    result: boolean;
}
