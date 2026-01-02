import "./home.scss";
import { Header } from "../components/Header";
import { UI_ICONS } from "../../assets/images";
import { Sidebar } from "../components/Sidebar";
import type { GroupInfo } from "../../engine/LobbyService";
import type { VNode } from "preact";
import { useEffect, useState } from "preact/hooks";
import { UI_EVENTS } from "../../engine/ui/UIFacade";
import { useGameEvent } from "../hooks/useGameEvent";
import { Navigator } from "../components/Navigator";
import { useGameCommand } from "../hooks/useGameCommand";
import { JoinExistingGame } from "../../engine/ui/commands/lobbies/JoinExistingGame";
import { PollLobbies } from "../../engine/ui/commands/lobbies/PollLobbies";
import { StopPollLobbies } from "../../engine/ui/commands/lobbies/StopPollLobbies";

const LobbyTableRow = (props: { id: string; name: string; map: string; currentSize: number; maxSize: number }) => {
    const playerNodes: VNode[] = [];

    for (let i = 0; i < props.maxSize; i++) {
        const className = i < props.currentSize ? "lobby-list__table-player-img" : "lobby-list__table-player-img lobby-list__table-player-img--empty";
        playerNodes.push(<img className={className} src={UI_ICONS.iconPlayer} />);
    }

    const joinLobby = () => {
        useGameCommand(new JoinExistingGame(props.id));
    };

    return (
        <tr onClick={joinLobby}>
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
        return <LobbyTableRow key={id} id={id} name={groupName} maxSize={maxSize} currentSize={currentSize} map="Base" />;
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
        useGameCommand(new PollLobbies());
        return () => {
            useGameCommand(new StopPollLobbies());
        };
    }, []);

    useGameEvent(UI_EVENTS.UPDATE_LOBBIES, ({ groups }) => {
        setLobbies(groups);
    });

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
            <Navigator />
            <Sidebar />
            <Header />
            <Home />
        </div>
    );
};
