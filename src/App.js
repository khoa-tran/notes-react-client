import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Nav, NavItem, Navbar } from 'react-bootstrap'
import { StyleSheet, css } from 'aphrodite';
import AWS from 'aws-sdk';
import Routes from './Routes'
import RouteNavItem from './components/RouteNavItem'
import { CognitoUserPool, } from 'amazon-cognito-identity-js';
import config from './config.js';

const styles = StyleSheet.create({
  app: {
    marginTop: '20px'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      isLoadingUserToken: true,
    };
  }

  async componentWillMount() {
    const currentUser = this.getCurrentUser();

    if (currentUser === null) {
      this.setState({ isLoadingUserToken: false });
      return;
    }

    try {
      const userToken = await this.getUserToken(currentUser);
      this.updateUserToken(userToken);
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoadingUserToken: false });
  }

  updateUserToken = (userToken) => {
    this.setState({
      userToken: userToken
    });
  }

  handleNavLink = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  handleLogout = (event) => {
    const currentUser = this.getCurrentUser();

    if (currentUser !== null) {
      currentUser.signOut();
    }

    if (AWS.config.credentials) {
      AWS.config.credentials.clearCachedId();
    }
    this.updateUserToken(null);
    this.props.history.push('/login'); // redirect to login page
  }

  getCurrentUser() {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID,
    });
    return userPool.getCurrentUser();
  }

  getUserToken(currentUser) {
    return new Promise((resolve, reject) => {
      currentUser.getSession(function(err, session) {
        if (err) {
          reject(err);
          return;
        }
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }

  render () {
    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken,
    };

    // Since loading the user token is an async process, we want to ensure that our app
    // does not change states when it first loads. So need to hold of rendering our app
    // till isLoadingUserToken is false
    return !this.state.isLoadingUserToken
    &&
    (
      <div className={css(styles.app)}>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              { this.state.userToken
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
              : [
                <RouteNavItem key={1} onClick={this.handleNavLink} href='/signup'>Signup</RouteNavItem>,
                <RouteNavItem key={2} onClick={this.handleNavLink} href='/login'>Login</RouteNavItem>
              ]
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    )
  }
}

export default withRouter(App);
