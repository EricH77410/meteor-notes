import React from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import NoteItem from './NoteItem'

import NoteListHeader from './NoteListHeader'
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = (props) => {
  const items = props.notes.map((note) => {
    return <NoteItem note={note} key={note._id} />
  })
  return (
    <div>
      <NoteListHeader />
      { props.notes.length === 0 ? <NoteListEmptyItem /> : undefined }
      { items }
      NoteList { props.notes.length }
    </div>
  )
}

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('notes')

  return {
    notes: Notes.find().fetch()
  }
}, NoteList)
