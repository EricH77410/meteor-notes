import React from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import { Session } from 'meteor/session'
import NoteItem from './NoteItem'

import NoteListHeader from './NoteListHeader'
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = (props) => {
  const items = props.notes.map((note) => {
    return <NoteItem note={note} key={note._id} />
  })
  return (
    <div className="item-list">
      <NoteListHeader />
      { props.notes.length === 0 ? <NoteListEmptyItem /> : undefined }
      { items }
    </div>
  )
}

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
}

export default createContainer(() => {

  const selectedNoteId = Session.get('selectedNoteId')

  Meteor.subscribe('notes')

  return {
    notes: Notes.find({},{sort: {updatedAt:-1}}).fetch().map((note)=>{
      return {
        ...note,
        selected: note._id === selectedNoteId
      }
    })
  }
}, NoteList)
