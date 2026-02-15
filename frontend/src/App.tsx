import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import CreateWorkspace from "./pages/CreateWorkspace"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import { useCurrentUserStore } from "./modules/auth/current-user.state"
import { useEffect, useState } from "react"
import { authRepository } from "./modules/auth/auth.repository"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentUser } = useCurrentUserStore();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) { 
      console.error("Error fetching current user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<CreateWorkspace />} />
          <Route path="/:workspaceId/:channelId" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
