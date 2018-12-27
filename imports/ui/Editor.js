import React from 'react';
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import { Notes } from '../api/notes'
import Modal from 'react-modal'

export class Editor extends React.Component{

  state = {
    title: '',
    body: '',
    isModalOpen: false
  }

  componentDidUpdate(prevProps, prevState){
    const currentNoteId = this.props.note ? this.props.note._id : undefined
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }

  }

  bodyChange = (e) => {
    const body = e.target.value

    this.setState({ body })
    this.props.call('notes.update', this.props.note._id, {
      body
    })
  }

  titleChange = (e) => {
    const title = e.target.value
    this.setState({ title })
    this.props.call('notes.update', this.props.note._id, {
      title
    })
  }

  onDeleteNote = () => {
    this.props.call('notes.remove', this.props.note._id)
    this.props.browserHistory.push('/dashboard')
  }

  handleModalClose = () => {
    this.setState({isModalOpen: false})
  }

  render(){

    if (this.props.note){
      return (
        <div className="editor">
          <input 
            className="editor__title" 
            type="text"
            value={this.state.title}
            placeholder="Untitled note"
            onChange={this.titleChange}
          />
          <textarea
            className="editor__body"
            value={this.state.body}
            placeholder="Your note here."
            onChange={this.bodyChange}
          >
          </textarea>
          <div>
            <button onClick={ () => this.setState({isModalOpen: true}) } className="button button--del">Delete Note</button>
          </div>

          <Modal
            isOpen={this.state.isModalOpen}
            contentLabel="Confirm"
            onRequestClose={this.handleModalClose}
            className="boxed-view__box"
            overlayClassName="boxed-view boxed-view--modal"
          >
            <h1>Confirm</h1>
            <p>Do you really want to delete this note ?</p>
            <div className="modal-button-container">
              <button id="yes" className="button" onClick={this.onDeleteNote}>Yes</button>
              <button className="button button--secondary" onClick={this.handleModalClose}>No</button>
            </div>
          </Modal>
          
        </div>
      )
    } else {
      return(
        <div className="editor">
          <p className="editor__msg">
            { this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.' }
          </p>
        </div>
        
      )
    }
  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
}

export default createContainer(()=>{
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  }
}, Editor)
