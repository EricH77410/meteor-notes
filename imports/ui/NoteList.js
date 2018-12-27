import React from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import { Session } from 'meteor/session'
import NoteItem from './NoteItem'
import SearchBar from './SearchBar'

import NoteListHeader from './NoteListHeader'
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = (props) => {
  const filter = Session.get('searchTerm')
  const items = filter ? props.filteredNotes.map((note) => {
    return <NoteItem note={note} key={note._id} />
  }) : props.notes.map((note) => {
    return <NoteItem note={note} key={note._id} />
  })
  return (
    <div className="item-list">

      <NoteListHeader />
      <SearchBar />
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
    }),
    filteredNotes:Notes.find({title: {$regex: new RegExp(".*" + Session.get('searchTerm') + ".*", "i")}}, {sort: {updatedAt: -1}}).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      }
    })
  }
}, NoteList)
