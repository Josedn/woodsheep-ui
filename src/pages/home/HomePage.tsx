import { Header } from "../components/Header";
import { UI_ICONS, GAME_TINTED_ICONS } from "../../assets/images";

import "./home.scss";
import { Sidebar } from "../components/Sidebar";
import { PopUp } from "../components/popups/PopUp";
import type { GroupInfo } from "../../game/engine/LobbyService";
import type { VNode } from "preact";
import { useEffect, useState } from "preact/hooks";
import { GameEngine } from "../../game/engine/GameEngine";

const LobbyTableRow = (props: { name: string; map: string; currentSize: number; maxSize: number }) => {
    const playerNodes: VNode[] = [];

    for (let i = 0; i < props.maxSize; i++) {
        const className = i < props.currentSize ? "lobby-list__table-player-img" : "lobby-list__table-player-img lobby-list__table-player-img--empty";
        playerNodes.push(<img className={className} src={UI_ICONS.iconPlayer} />);
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.map}</td>
            <td>30s</td>

            <td className="lobby-list__table-data-players">
                <div className="lobby-list__table-data-player-count">{playerNodes}</div>
            </td>
        </tr>
    );
};

const LobbyTable = (props: { lobbies: GroupInfo[] }) => {
    const lobbiesRows = props.lobbies.map(lobbyInfo => {
        const { id, maxSize, currentSize, groupName } = lobbyInfo.group;
        return <LobbyTableRow key={id} name={groupName} maxSize={maxSize} currentSize={currentSize} map="Base" />;
    });
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
            <tbody>{lobbiesRows}</tbody>
        </table>
    );
};

const Home = () => {
    const [lobbies, setLobbies] = useState<GroupInfo[]>([]);

    useEffect(() => {
        return GameEngine.getGame().uiFacade.on("updateLobbies", payload => {
            setLobbies(payload.groups);
        });
    }, []);

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
                                <LobbyTable lobbies={lobbies} />
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
