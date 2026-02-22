import WorkspaceSelector from './WorkspaceSelector';
import './Home.css';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { useCurrentUserStore } from '../../modules/auth/current-user.state';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Workspace } from '../../modules/workspaces/workspace.entity';
import { workspaceRepository } from '../../modules/workspaces/workspace.repository';

function Home() {
  const { currentUser } = useCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setWorkspaces(workspaces);
    } catch (error) {
      console.error('ワークスペースの取得に失敗:', error);
    }
  };

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div className="slack-container">
      <WorkspaceSelector workspaces={workspaces} />
      <>
        <Sidebar />
        <MainContent />
      </>
    </div>
  );
}

export default Home;
