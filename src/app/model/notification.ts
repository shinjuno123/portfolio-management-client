export class Notification {

    constructor(
        public id: string = "",
        public subject: string = "",
        public body: string = "",
        public imageUrl: string = "",
        public videoUrl: string = "",
        public active: boolean = false,
        public displayed: boolean = false,
        public version: number = 0,
        public updated: Date | null = null,
        public uploaded: Date | null = null) {}

}