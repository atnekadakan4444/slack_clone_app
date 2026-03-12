import api from "../../lib/api"
import { Message } from "./message.entity";

export const messageRepository = {
    async create(workspaceId: string, channelId: string, content: string): Promise<Message> {
        const result = await api.post(`/messages/${workspaceId}/${channelId}`, {
            content,
        });
        return new Message(result.data);
    }
};
