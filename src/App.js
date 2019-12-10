import React from 'react';
import LoginPage from './pages/login/Login';
import HeaderContainer from "./common/navbar/NavbarContainer";
import ProfileContainer from "./pages/profile/ProfileContainer";
import UsersContainer from "./pages/users/UsersContainer";
import './style/_base.scss';
import style from "./App.module.scss";
import {connect} from "react-redux";
import {compose} from "redux";
import {Route, withRouter} from "react-router-dom";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/preloader/Preloader";

class App extends React.PureComponent {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader/>
    }

    else if (window.location.pathname === '/login') {

      return <>
        <div className={`${style.headerBackground}`}>
          <HeaderContainer/>
        </div>
        <div className={`container`}>
          <Route path='/login' component={LoginPage}/>
        </div>
      </>
    }

    return <>
      <div className={`${style.headerBackground}`}>
        <HeaderContainer/>
      </div>
      <div className={`container`}>
        <Route path='/profile/:userId?' component={ProfileContainer}/>
        <Route path='/users' component={UsersContainer} />
      </div>
    </>
  };
}

const mapStateToProps = state => ({
  initialized: state.app.initialized
});

export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}),
)(App);
