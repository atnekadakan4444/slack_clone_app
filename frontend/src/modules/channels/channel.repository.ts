import api from "../../lib/api";
import { Channel } from "./channel.entity";

export const channelRepository = {
    async find(workspaceId: string): Promise<Channel[]> {
        const result = await api.get(`/channels/${workspaceId}`);
        return result.data.map((channelData: Channel) => new Channel(channelData));
    },
    async create(workspaceId: string, name: string) {
        const response = await api.post("/channels", { workspaceId, name });
        return new Channel(response.data);
    },
    async delete(channelId: string): Promise<boolean> {
        const response = await api.delete(`/channels/${channelId}`);
        return response.status === 200;
    }
};
