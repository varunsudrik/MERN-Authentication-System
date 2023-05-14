import PageNotFound from "./components/PageNotFound";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Username from "./components/Username";
import Reset from "./components/Reset";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// auth middleware
import { AuthorizeUser, ProtectPass } from "./middleware/auth";
import Dodo from "./components/Dodo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Username />} />
          <Route path="/dodo" element={<Dodo />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/password"
            element={
              <ProtectPass>
                <Password />
              </ProtectPass>
            }
          />
          <Route
            path="/Profile"
            element={
              <AuthorizeUser>
                <Profile />
              </AuthorizeUser>
            }
          />
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
