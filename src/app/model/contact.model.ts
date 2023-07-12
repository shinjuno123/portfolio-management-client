export class Contact {
    constructor(
        public id: string = "",
        public email: string = "",
        public subject: string = "",
        public content: string = "",
        public uploaded: Date | null = null,
    ){}
}