import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Footer } from "./components/Footer/Footer";
import { GameRulesPage } from "./components/GameRulesPage/GameRulesPage";
import { SignIn } from "./components/SignInUp/SignIn";
import { SignUp } from "./components/SignInUp/SignUp";
import { Profile } from "./components/Profile/Profile";

const App: React.FC = () => {
  return (
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
        <Route path="/profile" exact>
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
