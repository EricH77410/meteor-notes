import React from 'react';
import expect from 'expect'
import { mount } from 'enzyme'
import { Meteor } from 'meteor/meteor'

import { NoteList } from './NoteList'

const notes = [
  {
    _id: 'noteId1',
    title: 'Test title1',
    body: 'message',
    updatedAt: 0,
    userId: 'userId1'
  },
  {
    _id: 'noteId2',
    title: '',
    body: 'message',
    updatedAt: 0,
    userId: 'userId2'
  }
]

if (Meteor.isClient){
  describe('NoteListEmptyItem', function() {

    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes}/>)

      expect(wrapper.find('NoteItem').length).toBe(2)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0)
    })

    it('should render NoteListeEmptyItem if 0 notes', function() {
      const wrapper = mount(<NoteList notes={[]}/>)

      expect(wrapper.find('NoteItem').length).toBe(0)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1)
    })

  })
}
