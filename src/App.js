import { useEffect } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import MainRoute from "./routes/MainRoute";

function App() {
  const { checkAuth } = useAuthContext();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div>
      <MainRoute />
    </div>
  );
}

export default App;
