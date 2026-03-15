import api from "../../lib/api"
import { Message } from "./message.entity";

export const messageRepository = {
    async find(workspaceId: string, channelId: string): Promise<Message[]> {
        const result = await api.get(`/messages/${workspaceId}/${channelId}`);
        return result.data.map((msg: Message) => new Message(msg));
    },
    async create(workspaceId: string, channelId: string, content: string): Promise<Message> {
        const result = await api.post(`/messages/${workspaceId}/${channelId}`, {
            content,
        });
        return new Message(result.data);
    }
};
