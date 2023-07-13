export class RelevantSite {
    constructor(
        public id: string = "",
        public name: string = "",
        public url: string = "",
        public version: number = 0,
        public updated: Date | null = null,
        public uploaded: Date | null =null
    ){}
}