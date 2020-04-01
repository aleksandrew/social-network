// outsource dependencies
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

// local dependencies
import Header from './Header';
import { AUTH } from '../../constans/types';
import { selector } from '../../redusers/auth-reducer';


class HeaderContainer extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            photos: null,
        };
    }

    componentDidMount () {
        const primeryProfile = localStorage.getItem('primeryProfile');

        if (primeryProfile) {
            const photos = JSON.parse(primeryProfile)[0].photos;

            this.setState(() => ({ photos }));
        }
    }

    render () {
        return <Header photos={this.state.photos} {...this.props} />;
    }
}

export default connect(
    // mapStateToProps
    (state) => ({
        isAuth: selector(state).isAuth,
    }),
    // mapDispatchToProps
    (dispatch) => ({
        logout: () => dispatch({ type: AUTH.LOGOUT }),
    })
)(HeaderContainer);
