export class Page {
    constructor(
        public dataDTOs: object[] = [],
        public pageSize: number = 0,
        public currentPage: number = 0,
        public totalPage: number = 0,
        public lastPage: boolean = false,
        public firstPage: boolean = false,
    ){}
}