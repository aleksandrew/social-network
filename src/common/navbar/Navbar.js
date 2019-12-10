import React from 'react';
import style from './Navbar.module.scss';
import '../../style/_base.scss';
import {NavLink} from "react-router-dom";
import Logo from "../../components/logo/Logo";
import Ava from "../../components/ava/Ava";

const Navbar = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <NavLink to="/profile">
          <Logo/>
        </NavLink>
      </div>

      <nav className={style.nav}>
        <div className={style.search}>
          <input className={style.searchField}/>
          <button className={style.searchButton}/>
        </div>
        <ul className={style.list}>
          <li className={style.item}>
            <NavLink className={`${style.link} ${style.linkProfile}`} to="/profile">
              <Ava width={"24"} height={"24"} />
              <span className={style.linkProfileText} >
                Profile
              </span>
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink className={style.link} to="/profile">
              Home
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink className={style.link} to="/users">
              Find Friends
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink className={style.link} to="/profile">
              Create
            </NavLink>
          </li>
        </ul>

      </nav>

      {/*<div className={style.loginBlock}>*/}
      {/*{props.isAuth*/}
      {/*? <div>*/}
      {/*{props.login}*/}
      {/*<button onClick={props.logout}>Logout</button>*/}
      {/*</div>*/}
      {/*: <NavLink className={style.login}*/}
      {/*to={'/login'}>Login</NavLink>*/}
      {/*}*/}
      {/*</div>*/}
    </header>
  )
};

export default Navbar;
