import React from 'react';
import style from './Navbar.module.scss';
import '../../style/_base.scss';
import logo from '../../images/icon.svg';
import {NavLink} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

const Navbar = props => {
  return (
    <header className={`heightInherit`}>
      <Row>
        <Col lg={1}>
          <NavLink className={style.link} to="/profile">
            <img
              src={logo}
              className={style.logo}/>
          </NavLink>
        </Col>
          {/*<Col></Col>*/}

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
      </Row>
    </header>
  )
};

export default Navbar;
