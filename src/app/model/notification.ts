export class Notification {

    constructor(
        public id: string,
        public subject: string,
        public body: string,
        public imageUrl: string,
        public videoUrl: string,
        public active: boolean,
        public displayed: boolean,
        public version: number,
        public updated: Date,
        public uploaded: Date) {}

}