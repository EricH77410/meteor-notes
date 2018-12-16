import React from 'react';
import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'
import moment from 'moment'

import { notes } from '../fixtures/fixtures'

import { NoteItem } from './NoteItem'

if (Meteor.isClient) {
  describe('Note Item', function() {

    let Session;

    beforeEach(()=>{
      Session = {
        set: expect.createSpy()
      }
    })

    it('should render title and timestamp', function() {
      const wrapper = mount(<NoteItem note={notes[0]} Session={Session}/>)

      expect(wrapper.find('h5').text()).toBe(notes[0].title)
      expect(wrapper.find('p').text()).toBe(moment(notes[0].updatedAt).format('DD/M/YYYY'))

    })

    it('should render a default title is no title set', function() {
      const wrapper = mount(<NoteItem note={notes[1]} Session={Session}/>)

      expect(wrapper.find('h5').text()).toBe('Untitled note')
      expect(wrapper.find('p').text()).toBe(moment(notes[1].updatedAt).format('DD/M/YYYY'))
    })

    it('should call set on click', function(){
      const wrapper = mount(<NoteItem note={notes[0]} Session={Session}/>)
      wrapper.find('div').simulate('click')
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId',notes[0]._id)
    })

  })
}
