import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  notFound: {
    paddingTop: '100px',
    textAlign: 'center',
  }
});

const NotFound = () => (
  <div className={css(styles.notFound)}>
    <h3>Sorry, page not found!</h3>
  </div>
);

export default NotFound;
