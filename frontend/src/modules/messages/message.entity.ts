import api from "../../lib/api";
import { User } from "../users/user.entity";

export class Message {
  id!: string;
  content?: string;
  imageUrl?: string;
  user!: User;
  createdAt!: Date;
  constructor(data: Message) {
    Object.assign(this, data);
    // スペース区切りの日時文字列をISOフォーマットに正規化してパース
    const rawcreatedAt = this.createdAt as unknown as string;
    this.createdAt = new Date(
      typeof rawcreatedAt === "string"
        ? rawcreatedAt.replace(" ", "T")
        : rawcreatedAt,
    );
    if (data.user != null) {
      this.user = new User(data.user);
    }
  }
  get dateString(): string {
    return this.createdAt.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  get datetimeString(): string {
    return this.createdAt.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
