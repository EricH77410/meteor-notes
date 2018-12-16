import React from 'react';
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'
import expect from 'expect'

import { NoteListHeader } from './NoteListHeader'

if(Meteor.isClient){

  describe('Note List Header', function() {

    it('should render the NoteListHeader component', function(){
      const wrapper = mount(<NoteListHeader/>)

      expect(wrapper.find('button').text()).toBe('New Note')
    })

    it('should call the meteorCall on button click', function(){
      const spy = expect.createSpy()
      const wrapper = mount(<NoteListHeader meteorCall={spy}/>)

      wrapper.find('button').simulate('click')
      expect(spy).toHaveBeenCalledWith('notes.insert')
    })

  })

}
