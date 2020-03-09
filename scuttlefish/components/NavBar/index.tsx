import React from "react";

import "style-loader!css-loader!sass-loader!./style.scss";

const HistoryControls: React.SFC = () => (
  <span className="historyControls">
    <button className="prev"></button>
    <button className="next"></button>
  </span>
);

const MainMenu: React.SFC = () => (
  <span className="mainMenu">
    <a className="selected">Public</a>
    <a>Private</a>
  </span>
);

const Searchbar: React.SFC = () => {
  return (
    <span className="searchbar">
      <input type="search" placeholder="search" />
    </span>
  );
};

const ProfileMenu: React.SFC = () => (
  <span className="profileMenu">
    <a>Profile</a>
    <a>Participating</a>
    <a>Mentions</a>
  </span>
);

const NavBar: React.SFC = () => {
  return (
    <nav className="navbar">
      <HistoryControls />
      <MainMenu />
      <div className="apptitle">Souma</div>
      <Searchbar />
      <ProfileMenu />
    </nav>
  );
};

export default NavBar;
