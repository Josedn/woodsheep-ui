import { Header, Sidebar } from "./components/GenericPage";
import iconPlayer from "../assets/ui/icon_player_loggedin.88be0a3c581efb9f2d3a.svg";

import "./home.scss";

const LobbyTableRow = (props: { host: string; map: string }) => {
    return (
        <tr>
            <td>{props.host}</td>
            <td>{props.map}</td>
            <td>30s</td>

            <td class="lobby-list__table-data-players">
                <div class="lobby-list__table-data-player-count">
                    <img class="lobby-list__table-player-img" alt="User" src={iconPlayer} />
                    <img class="lobby-list__table-player-img" alt="User" src={iconPlayer} />
                    <img class="lobby-list__table-player-img lobby-list__table-player-img--empty" alt="Guest" src={iconPlayer} />
                    <img class="lobby-list__table-player-img lobby-list__table-player-img--empty" alt="Guest" src={iconPlayer} />
                </div>
            </td>
        </tr>
    );
};

const LobbyTable = () => {
    return (
        <table className="lobby-list__table">
            <thead>
                <tr>
                    <th scope="col">
                        <div>Host</div>
                    </th>
                    <th scope="col">
                        <div>Map</div>
                    </th>
                    <th scope="col">
                        <div>Turn Timer</div>
                    </th>
                    <th scope="col">
                        <div>Players</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <LobbyTableRow host="Bold" map="Base" />
                <LobbyTableRow host="Lissi" map="Base" />
                <LobbyTableRow host="Ester" map="Volcano" />
                <LobbyTableRow host="Bold" map="Base" />
                <LobbyTableRow host="Lissi" map="Base" />
                <LobbyTableRow host="Ester" map="Volcano" />
                <LobbyTableRow host="Bold" map="Base" />
                <LobbyTableRow host="Lissi" map="Base" />
                <LobbyTableRow host="Ester" map="Volcano" />
                <LobbyTableRow host="Bold" map="Base" />
                <LobbyTableRow host="Lissi" map="Base" />
                <LobbyTableRow host="Ester" map="Volcano" />
            </tbody>
        </table>
    );
};

const Home = () => {
    return (
        <div className="home">
            <div className="home__main-content">
                <div className="lobby-list">
                    <div className="lobby-list__tab-container">
                        <div className="lobby-list__tab lobby-list__tab--active">
                            <div className="lobby-list__tab-label">Rooms</div>
                        </div>
                        <div className="lobby-list__tab">
                            <div className="lobby-list__tab-label">Spectate</div>
                        </div>
                    </div>
                    <div className="lobby-list__content">
                        <div className="lobby-list__scrollable">
                            <div className="lobby-list__header-background"></div>
                            <div className="lobby-list__table-container">
                                <LobbyTable />
                            </div>
                        </div>
                    </div>
                    <div className="lobby-list__actions">
                        <div class="lobby-list__action">Create Room</div>
                        <div class="lobby-list__action lobby-list__action--alternative">Join Room</div>
                    </div>
                </div>
            </div>
            <div className="home__ads"></div>
        </div>
    );
};

export const HomePage = () => {
    return (
        <div className="layout">
            <Sidebar />
            <Header />
            <Home />
        </div>
    );
};
