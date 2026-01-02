import { Header } from "../components/Header";
import { UI_ICONS, GAME_TINTED_ICONS } from "../../assets/images";

import "./home.scss";
import { Sidebar } from "../components/Sidebar";
import { PopUp } from "../components/popups/PopUp";

const LobbyTableRow = (props: { host: string; map: string }) => {
    return (
        <tr>
            <td>{props.host}</td>
            <td>{props.map}</td>
            <td>30s</td>

            <td className="lobby-list__table-data-players">
                <div className="lobby-list__table-data-player-count">
                    <img className="lobby-list__table-player-img" src={UI_ICONS.iconPlayer} />
                    <img className="lobby-list__table-player-img" src={UI_ICONS.iconPlayer} />
                    <img className="lobby-list__table-player-img lobby-list__table-player-img--empty" src={UI_ICONS.iconPlayer} />
                    <img className="lobby-list__table-player-img lobby-list__table-player-img--empty" src={UI_ICONS.iconPlayer} />
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
                        <div className="lobby-list__action">Create Room</div>
                        <div className="lobby-list__action lobby-list__action--alternative">Join Room</div>
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
