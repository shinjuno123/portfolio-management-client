export class Project {
    constructor(
        public id: string = "",
        public projectName: string = "",
        public imagePath: string = "",
        public url: string = "",
        public updated: Date | null = null,
        public uploaded: Date | null = null
    ){}
}