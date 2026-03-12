import { User } from "../users/user.entity";

export class Message {
    id!: string;
    content?: string;
    imageUrl?: string;
    user?: User;
    sentAt!: Date;
    constructor(data: Message) {
        Object.assign(this, data);
        this.sentAt = new Date(this.sentAt);
        if (data.user != null) {
            this.user = new User(data.user);
        }
    }
}
