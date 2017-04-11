import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import {
  PageHeader,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'
import { StyleSheet, css } from 'aphrodite';
import { invokeApiGateway } from '../libs/awsLib';

const styles = StyleSheet.create({
  lander: {
    padding: '80px 0',
    textAlign: 'center',
  },
  landerH1: {
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 600,
  },
  landerP: {
    color: '#999',
  },
  notesH4: {
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 600,
    overFlow: 'hidden',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  notesP: {
    color: '#666'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      notes: [],
    };
  }

  async componentWillMount() {
      if (this.props.userToken === null) {
        return;
      }

      this.setState({ isLoading: true });

      try {
        const results = await this.notes();
        this.setState({ notes: results });
      } catch (e) {
        alert(e);
      }

      this.setState({ isLoading: false });
  }

  notes() {
    return invokeApiGateway({ path: '/notes' }, this.props.userToken);
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) => (
      i !== 0
        ? ( <ListGroupItem
              key={note.noteId}
              href={`/notes/${note.noteId}`}
              onClick={this.handleNoteClick}
              header={note.content.trim().split('\n')[0]}>
              <div className={css(styles.notesP)}>{ "Created: " + (new Date(note.createdAt)).toLocaleString() }</div>
        </ListGroupItem> )
        : ( <ListGroupItem
              key="new"
              href="/notes/new"
              onClick={this.handleNoteClick}>
              <div className={css(styles.notesH4)}><h4><b>{'\uFF0B'}</b> Create a new note</h4></div>
        </ListGroupItem> )
    ));
  }

  handleNoteClick = (event) => {
      event.preventDefault();
      this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  renderLander () {
    return (
      <div className={css(styles.lander)}>
        <h1 className={css(styles.landerH1)}>Scratch</h1>
        <p className={css(styles.landerP)}>A simple note taking app</p>
      </div>
    )
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          { ! this.state.isLoading
            && this.renderNotesList(this.state.notes) }
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        { this.props.userToken === null
          ? this.renderLander()
          : this.renderNotes() }
      </div>
    )
  }
}

Home.propTypes = {
  userToken: PropTypes.string
}
export default withRouter(Home);
