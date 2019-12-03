import React from 'react';
import Navbar from "./Navbar";
// import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

class NavbarContainer extends React.Component {

  render() {
    return (
      <Navbar {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  // isAuth: state.auth.isAuth,
  // login: state.auth.login,
});

export default connect(mapStateToProps,
  // {logout}
  )(NavbarContainer);
