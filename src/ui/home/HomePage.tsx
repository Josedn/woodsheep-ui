import "./home.scss";
import { UI_ICONS } from "../../assets/images";
import type { ShortRoomInfo } from "../../engine/LobbyService";
import type { VNode } from "preact";
import { useState } from "preact/hooks";
import { UI_EVENTS } from "../../engine/ui-facade/UIFacade";
import { useGameEvent } from "../hooks/useGameEvent";
import { useGameCommand } from "../hooks/useGameCommand";
import { CommandJoinExistingGame } from "../../engine/ui-facade/commands/lobbies/CommandJoinExistingGame";
import { CommandPollLobbies } from "../../engine/ui-facade/commands/lobbies/CommandPollLobbies";
import { useMountEffect } from "../hooks/useMountEffect";
import { Layout } from "../components/Layout";
import { CommandCreateRoom } from "../../engine/ui-facade/commands/lobbies/CommandCreateRoom";

const LobbyTableRow = (props: { id: string; name: string; map: string; currentSize: number; maxSize: number }) => {
    const playerNodes: VNode[] = [];

    for (let i = 0; i < props.maxSize; i++) {
        const className = i < props.currentSize ? "lobby-list__table-player-img" : "lobby-list__table-player-img lobby-list__table-player-img--empty";
        playerNodes.push(<img className={className} src={UI_ICONS.iconPlayer} />);
    }

    const joinLobby = () => {
        useGameCommand(new CommandJoinExistingGame(props.id));
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

const LobbyTable = (props: { lobbies: ShortRoomInfo[] }) => {
    const lobbiesRows = props.lobbies.map(lobbyInfo => {
        const { roomId, maxPlayers, currentPlayers, name } = lobbyInfo;
        return <LobbyTableRow key={roomId} id={roomId} name={name} maxSize={maxPlayers} currentSize={currentPlayers} map="Base" />;
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
    const [lobbies, setLobbies] = useState<ShortRoomInfo[]>([]);

    useMountEffect(() => {
        useGameCommand(new CommandPollLobbies());
    });

    useGameEvent(UI_EVENTS.UPDATE_LOBBIES_LIST, ({ rooms }) => {
        setLobbies(rooms);
    });

    const handleCreateRoom = () => {
        useGameCommand(new CommandCreateRoom());
    };

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
                        <div onClick={handleCreateRoom} className="lobby-list__action">
                            Create Room
                        </div>
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
        <Layout>
            <Home />
        </Layout>
    );
};
