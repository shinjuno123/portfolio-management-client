export class Certification {
    constructor(
        public id: string = "",
        public name: string = "",
        public downloadUrl: string = "",
        public updated: Date | null = null,
        public uploaded: Date | null = null
    ){}
}