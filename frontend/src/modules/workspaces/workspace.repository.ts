import api from "../../lib/api"
import { Workspace } from "./workspace.entity";

export const workspaceRepository = {
    async create(name: string): Promise<Workspace> {
        const result = await api.post("/workspaces", { name });
        return new Workspace(result.data);
    },
}
