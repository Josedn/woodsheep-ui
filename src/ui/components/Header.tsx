import { useState } from "preact/hooks";
import { UI_ICONS } from "../../assets/images";
import type { UserInfo } from "../../engine/ProfileService";
import { useGameEvent } from "../hooks/useGameEvent";
import { UI_EVENTS } from "../../engine/ui-facade/UIFacade";
import { useGameCommand } from "../hooks/useGameCommand";
import { CommandGetUserInfo } from "../../engine/ui-facade/commands/CommandGetUserInfo";
import { useMountEffect } from "../hooks/useMountEffect";

export const Header = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>();

    useGameEvent(UI_EVENTS.UPDATE_USER_INFO, ({ userInfo }) => {
        setUserInfo(userInfo);
    });

    useMountEffect(() => {
        useGameCommand(new CommandGetUserInfo());
    });

    const userName = userInfo?.username ?? "";

    return (
        <header className="header">
            <div className="header__left">
                <div className="header__profile">
                    <div className="header__profile-logged-in">
                        <div className="header__profile-avatar">
                            <img className="header__profile-avatar-image" src={UI_ICONS.iconPlayer} alt="User" />
                        </div>
                        <div>
                            <p className="header__profile-username">{userName}</p>
                            <p className="header__profile-karma">Karma: 20/20</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__right">
                <div className="header__notifications">
                    <div className="header__notifications-icon">
                        <img className="header__notifications-image" src={UI_ICONS.iconBell} alt="Notification Icon" />
                        <div className="header__notifications-count-container">
                            <span className="header__notifications-count">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
