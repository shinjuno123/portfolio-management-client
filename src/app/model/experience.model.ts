export class Experience {
    constructor(
        public id: string = "",
        public title: string = "",
        public imgPath: string = "",
        public company: string = "",
        public positionName: string = "",
        public status: string = "",
        public workingPeriod: string = "",
        public description: string = "",
        public uploaded: Date | null = null,
        public updated: Date | null = null
    ){} 
}