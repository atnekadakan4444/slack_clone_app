import WorkspaceSelector from "./WorkspaceSelector";
import "./Home.css";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Workspace } from "../../modules/workspaces/workspace.entity";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import type { Channel } from "../../modules/channels/channel.entity";
import { channelRepository } from "../../modules/channels/channel.repository";

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const params = useParams();
  const { workspaceId } = params;
  const selectedWorkspace =
    workspaces.find((w) => w.id === workspaceId);

  // undefined（または空文字）の場合は早期リターン
  if (!workspaceId) return <div>エラー: ワークスペースIDがURLに含まれていません。</div>;

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [workspaceId]);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setWorkspaces(workspaces);
    } catch (error) {
      console.error("ワークスペースの取得に失敗:", error);
    }
  };

  const fetchChannels = async () => {
    try {
      const channels = await channelRepository.find(workspaceId);
      setChannels(channels);
    } catch (error) {
      console.error("チャンネルの取得に失敗:", error);
    }
  };

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        selectedWorkspaceId={workspaceId}
      />
      {selectedWorkspace != null ? (
        <>
          <Sidebar selectedWorkspace={selectedWorkspace} />
          <MainContent />
        </>
      ) : (
        <div className="sidebar"/>
      )}
    </div>
  );
}

export default Home;
