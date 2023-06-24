export class RelevantSite {
    constructor(
        public id: string,
        public name: string,
        public url: string,
        public version: number,
        public updated: Date,
        public uploaded: Date
    ){}
}