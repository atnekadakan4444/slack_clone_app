import api from "../../lib/api";
import type { Workspace } from "../workspaces/workspace.entity";
import { WorkspaceUser } from "./workspace-user.entity";

export const workspaceUserRepository = {
  async create(
    workspaceId: string,
    userIds: string[],
  ): Promise<WorkspaceUser[]> {
    const result = await api.post(`/workspace-users/${workspaceId}`, {
      userIds,
    });
    return result.data.workspaceUsers.map(
      (data: WorkspaceUser) => new WorkspaceUser(data),
    );
  },
};
