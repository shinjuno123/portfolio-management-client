export class Page {
    constructor(
        public content: object[] = [],
        public empty: boolean = false,
        public first: boolean = true,
        public last: boolean = true,
        public number: number = 0,
        public numberOfElements: number = 0,
        public size: number = 0,
        public totalElements: number = 0,
        public totalPages: number = 1
    ){}
}