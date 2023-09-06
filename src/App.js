import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// styles
import "./App.css";

// pages & components
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="content">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={!user ? <Navigate to="/login" /> : <Dashboard />}
              />
              <Route
                path="/create"
                element={!user ? <Navigate to="/login" /> : <Create />}
              />
              <Route
                path="/projects/:id"
                element={!user ? <Navigate to="/login" /> : <Project />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={
                  user && user.displayName ? <Navigate to="/" /> : <Signup />
                }
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
