import "../Signup/auth.css";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate } from "react-router-dom";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";

function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();

  const createWorkspace = async (name: string) => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      console.log("Created workspace:", newWorkspace);
    } catch (error) {
      console.error("ワークスペースの作成に失敗:", error);
    }
  };

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div>
      <CreateWorkspaceModal onSubmit={createWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
