import { UI_ICONS } from "../../assets/images";

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <a className="sidebar__logo-link" href="/">
                    <img className="sidebar__logo-image" src={UI_ICONS.logo} alt="logo" />
                </a>
            </div>
            <div className="sidebar__nav">
                <a href="/lobby" className="sidebar__nav-item sidebar__nav-item--active">
                    <img className="sidebar__nav-image" src={UI_ICONS.iconFriends} alt="Lobby" />
                    <span className="sidebar__nav-label">Lobby</span>
                </a>
                <a href="/profile" className="sidebar__nav-item">
                    <img className="sidebar__nav-image" src={UI_ICONS.iconPlayer} alt="Profile" />
                    <span className="sidebar__nav-label">Profile</span>
                </a>
            </div>
            <div className="sidebar__footer">
                <div className="sidebar__language-button">
                    <img className="sidebar__language-image" src={UI_ICONS.iconLanguage} alt="Language Icon" />
                    <div className="sidebar__language-label">en</div>
                </div>
            </div>
        </div>
    );
};
