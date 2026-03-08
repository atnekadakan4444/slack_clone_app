export class User {
    id!: string;
    name!: string;
    email!: string;
    thumbnailUrl?: string;
    
    constructor(data: User) {
        Object.assign(this, data);
    }

    get iconUrl() {
        return this.thumbnailUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
    }
}
