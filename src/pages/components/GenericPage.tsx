import iconLanguage from "../../assets/ui/icon_language.add24071ab94e6c5bee0.svg";
import iconBell from "../../assets/ui/icon_bell.6a6382d11bfb67a469be.svg";
import logo from "../../assets/ui/logo.a66b03915fd67e4c68f8.svg";
import iconFriends from "../../assets/ui/icon_profile_friends.070663d1d744eb49945c.svg";
import iconPlayer from "../../assets/ui/icon_player_loggedin.88be0a3c581efb9f2d3a.svg";

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <a className="sidebar__logo-link" href="/">
                    <img className="sidebar__logo-image" src={logo} alt="logo" />
                </a>
            </div>
            <div className="sidebar__nav">
                <a href="/lobby" className="sidebar__nav-item sidebar__nav-item--active">
                    <img className="sidebar__nav-image" src={iconFriends} alt="Lobby" />
                    <span className="sidebar__nav-label">Lobby</span>
                </a>
                <a href="/profile" className="sidebar__nav-item">
                    <img className="sidebar__nav-image" src={iconPlayer} alt="Profile" />
                    <span className="sidebar__nav-label">Profile</span>
                </a>
            </div>
            <div className="sidebar__footer">
                <div className="sidebar__language-button">
                    <img className="sidebar__language-image" src={iconLanguage} alt="Language Icon" />
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
                            <img className="header__profile-avatar-image" src={iconPlayer} alt="User" />
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
                        <img className="header__notifications-image" src={iconBell} alt="Notification Icon" />
                        <div className="header__notifications-count-container">
                            <span className="header__notifications-count">16</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
