import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { StyleSheet, css } from 'aphrodite';
import Routes from './Routes'
import RouteNavItem from './components/RouteNavItem'

const styles = StyleSheet.create({
  app: {
    marginTop: '20px'
  }
});

class App extends Component {
  handleNavLink = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  render () {
    return (
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
              <RouteNavItem onClick={this.handleNavLink} href='/signup'>Signup</RouteNavItem>
              <RouteNavItem onClick={this.handleNavLink} href='/login'>Login</RouteNavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    )
  }
}

export default withRouter(App);
