import React from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import NoteItem from './NoteItem'

import NoteListHeader from './NoteListHeader'

export const NoteList = (props) => {
  const items = props.notes.map((note) => {
    return <NoteItem note={note} key={note._id} />
  })
  return (
    <div>
      <NoteListHeader />
      NoteList { props.notes.length }
      { items }
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
