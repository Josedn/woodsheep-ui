import { render } from "preact";
import { LocationProvider, ErrorBoundary, Router, Route } from "preact-iso";
import { LobbyPage } from "./pages/LobbyPage.tsx";
import { GameUI } from "./pages/GameUI.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import "./assets/fonts/fonts.css";
import "./main.scss";

const App = () => {
    return (
        <LocationProvider>
            <ErrorBoundary>
                <Router>
                    <Route default={true} component={HomePage} />
                    <Route path="/game/:id?" component={GameUI} />
                    <Route path="/lobby/:id?" component={LobbyPage} />
                </Router>
            </ErrorBoundary>
        </LocationProvider>
    );
};

render(<App />, document.getElementById("app")!);
