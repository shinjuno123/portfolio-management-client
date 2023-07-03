export class Intro {
    
    constructor(
        public id: string = "", 
        public sayHi: string = "", 
        public name: string = "", 
        public opening: string = "",
        public active: boolean = false,
        public uploaded: Date | null = null,
        public updated: Date | null = null){
    }
}