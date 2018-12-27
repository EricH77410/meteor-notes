import { Meteor } from 'meteor/meteor'
import React from 'react';
import expect from 'expect'
import { mount } from 'enzyme'

import { SearchBar } from './SearchBar'

if (Meteor.isClient) {
    describe('SearchBar', function() {
        it('should set state to a string', function(){
            const wrapper = mount(<SearchBar/>)

            wrapper.find('input').simulate('change', {
                target: {value: 'note to find'} 
            })

            expect(wrapper.state('term')).toBe('note to find')
        })
    })
}
