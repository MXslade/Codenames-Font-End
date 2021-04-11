import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Footer } from "./components/Footer/Footer";
import { GameRulesPage } from "./components/GameRulesPage/GameRulesPage";
import { SignIn } from "./components/SignInUp/SignIn";
import { SignUp } from "./components/SignInUp/SignUp";
import { Profile } from "./components/Profile/Profile";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
      }}
    >
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/game-rules" exact>
            <GameRulesPage />
          </Route>
          <Route path="/sign-in" exact>
            <SignIn />
          </Route>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          <PrivateRoute path="/profile" exact>
            <Profile />
          </PrivateRoute>
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
