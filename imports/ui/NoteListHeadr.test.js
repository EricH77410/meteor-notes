import React from 'react';
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'
import expect from 'expect'

import { NoteListHeader } from './NoteListHeader'
import { notes } from '../fixtures/fixtures'

if(Meteor.isClient){

  describe('Note List Header', function() {

    let meteorCall
    let Session

    beforeEach(function(){
      meteorCall = expect.createSpy()
      Session = {
        set: expect.createSpy()
      }
    })

    it('should render the NoteListHeader component', function(){
      const wrapper = mount(<NoteListHeader/>)

      expect(wrapper.find('button').text()).toBe('New Note')
    })

    it('should call the meteorCall on button click', function(){
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>)

      wrapper.find('button').simulate('click')
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id)

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert')
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
    })

    it('should not set Session for failed insert', function(){
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>)

      wrapper.find('button').simulate('click')
      meteorCall.calls[0].arguments[1]('Error', undefined)

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert')
      expect(Session.set).toNotHaveBeenCalled()
    })

  })

}
