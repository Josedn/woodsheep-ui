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

export const Header = () => {
    return (
        <header className="header">
            <div className="header__left">
                <div className="header__profile">
                    <div className="header__profile-logged-in">
                        <div className="header__profile-avatar">
                            <img className="header__profile-avatar-image" src={UI_ICONS.iconPlayer} alt="User" />
                        </div>
                        <div>
                            <p className="header__profile-username">Bold</p>
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
                            <span className="header__notifications-count">16</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
