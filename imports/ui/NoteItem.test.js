import React from 'react';
import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'
import moment from 'moment'

import NoteItem from './NoteItem'

if (Meteor.isClient) {
  describe('Note Item', function() {

    it('should render title and timestamp', function() {
      const title = 'My title'
      const updatedAt = 1486137505429
      const wrapper = mount(<NoteItem note={{ title, updatedAt }}/>)

      expect(wrapper.find('h5').text()).toBe(title)
      expect(wrapper.find('p').text()).toBe(moment(updatedAt).format('DD/M/YYYY'))

    })

    it('should render a default title is no title set', function() {
      const title = ''
      const updatedAt = 1486137505429
      const wrapper = mount(<NoteItem note={{ title, updatedAt }}/>)

      expect(wrapper.find('h5').text()).toBe('Untitled note')
      expect(wrapper.find('p').text()).toBe(moment(updatedAt).format('DD/M/YYYY'))
    })

  })
}
