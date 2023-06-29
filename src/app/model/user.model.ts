export class User {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public mobileNumber: string;
    public role: string;
    public createdAt: Date | null;
    public updatedAt: Date | null;

    constructor(
        id: string = '',
        name: string =  '',
        email: string = '',
        password: string = '',
        mobileNumber: string = '',
        role: string = '',
        createdAt: Date | null = null,
        updatedAt: Date | null = null,
        ) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.password = password;
            this.mobileNumber = mobileNumber;
            this.role = role;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
}