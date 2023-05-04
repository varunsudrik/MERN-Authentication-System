import "./App.css";
import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Username from "./components/Username";
import Reset from "./components/Reset";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Username />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password" element={<Password />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Recovery" element={<Recovery />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/PageNotFound" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/PageNotFound" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
