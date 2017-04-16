import React from 'react'
import avatar from 'AvatarImage'

const Header = () =>
  <header className="header">
    <i className="header-icon">&#xf281;</i>
    <span className="header-logo">StarWars</span>
    <img className="header-avatar" src={avatar} />
    <span className="header-name">Asad</span>
    <span className="header-name">Razvi</span>
  </header>

export default Header
