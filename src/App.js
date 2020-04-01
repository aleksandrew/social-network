// outsource dependencies
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

// local dependencies
import './style/_base.scss';
import Error from './common/error';
import { APP } from './constans/types';
import LoginPage from './pages/login/index';
import { selector } from './redusers/app-reducer';
import Preloader from './components/preloader/Preloader';
import UsersContainer from './pages/users/UsersContainer';
import HeaderContainer from './common/header/HeaderContainer';
import ProfileContainer from './pages/profile/ProfileContainer';
import SettingContainer from './pages/setting/SettingContainer';
import MessageContainer from './pages/message/MessageContainer';

class App extends PureComponent {
    // it will be global error handler
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        console.log(promiseRejectionEvent);
    };

    componentDidMount () {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount () {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render () {
        if (!this.props.initialized) {
            return <Preloader/>;
        } else if (this.props.location.pathname === '/login') {
            return <Route path="/login" component={LoginPage}/>;
        }

        return (
            <>
                <HeaderContainer/>
                <Switch>
                    <Route path="/profile/:userId?" component={ProfileContainer}/>
                    <Route path="/users" component={UsersContainer}/>
                    <Route path="/message" component={MessageContainer}/>
                    <Route path="/setting" component={SettingContainer}/>
                    <Redirect exact from="/" to="/profile"/>
                    <Route path="/*" component={Error}/>
                </Switch>
            </>
        );
    }
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    initialized: PropTypes.bool.isRequired,
    initializeApp: PropTypes.func.isRequired,
};

export default compose(
    connect(
        // mapStateToProps
        (state) => ({
            initialized: selector(state).initialized,
        }),
        // mapDispatchToProps
        (dispatch) => ({
            initializeApp: () => dispatch({ type: APP.INITIALIZED_APP }),
        })),
    withRouter,
)(App);
