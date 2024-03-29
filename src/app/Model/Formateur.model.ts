import { Offres } from "./Offres.model";

export class Formateur {

    constructor(
        public id?: number | undefined | null,
        public nom?: string | null,
        public prenom?: string | null,
        public numeroTel?: string | null,
        public email?: string,
        public mdp?: string,
        public photo?: string,
        public cv?: Blob,
        public offre: Offres[] = []

    ) {

    }
}