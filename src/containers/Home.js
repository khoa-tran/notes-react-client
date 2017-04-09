import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  lander: {
    padding: '80px 0',
    textAlign: 'center',
  },
  h1: {
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 600,
  },
  p: {
    color: '#999',
  }
});

class Home extends Component {
  render () {
    return (
      <div className={css(styles.lander)}>
        <h1 className={css(styles.h1)}>Scratch</h1>
        <p className={css(styles.p)}>A simple note taking app</p>
      </div>
    )
  }
}

export default Home
