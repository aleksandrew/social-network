import React from 'react';
import HeaderContainer from "./common/navbar/NavbarContainer";
import './style/_base.scss';
import style from "./App.module.scss";
import {connect} from "react-redux";
import {compose} from "redux";
// import Nav from './components/nav/Nav';
// import LoginPage from './components/login/Login';
// import Main from './components/main/Main';
// import {Route, withRouter} from "react-router-dom";
// import {initializeApp} from "./redux/app-reducer";
// import Preloader from "./components/common/Preloader/Preloader";
//
//
// class App extends React.Component {
//
//   componentDidMount() {
//     this.props.initializeApp();
//   }
//
//   render() {
//
//     if (!this.props.initialized) {
//
//       return <Preloader/>
//     }
//
//     else if (window.location.pathname === '/login') {
//
//       return <div>
//         <div className={style.headerBackground}>
//           <div className={style.container}>
//             <HeaderContainer/>
//           </div>
//         </div>
//         <div className={style.container}>
//           <Route path='/login' component={LoginPage}/>
//         </div>
//       </div>
//     }
//
//     return <div>
//       <div className={style.headerBackground}>
//         <div className={style.container}>
//           <HeaderContainer/>
//         </div>
//       </div>
//       <div className={style.container}>
//         <Nav/>
//         <Main/>
//       </div>
//     </div>
//   };
// }
//
// const mapStateToProps = state => ({
//   initialized: state.app.initialized
// });
//
// export default compose(
//   withRouter,
//   connect(mapStateToProps, {initializeApp}),
// )(App);

const App = React.memo(props => {

    return <>
      <div className={style.headerBackground}>
        <div className={`container heightInherit`}>
          <HeaderContainer/>
        </div>
      </div>
      {/*<div className={style.container}>*/}
        {/*<Nav/>*/}
        {/*<Main/>*/}
      {/*</div>*/}
    </>
});

// const mapStateToProps = state => ({
//   initialized: state.app.initialized
// });

export default compose(
//   withRouter,
//   connect(mapStateToProps, {initializeApp}),
)(App);

// export default App;
