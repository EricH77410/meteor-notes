import { Meteor } from 'meteor/meteor'
import React from 'react';
import expect from 'expect'
import { mount } from 'enzyme'

import { Signup } from './Signup'

if (Meteor.isClient){

  describe('Signup', function() {

    it('should show error messages', function() {
      const error = 'This is an error'
      const wrapper = mount(<Signup createUser={()=>{}}/>)
      wrapper.setState({error})

      expect(wrapper.find('p').first().text()).toBe(error)

      wrapper.setState({error:''})
      expect(wrapper.find('p').length).toBe(1)
    })

    it('should call createUser with form data', function(){
      const email = 'rico@rico.fr'
      const password = '12345678'
      const spy = expect.createSpy()
      const wrapper = mount(<Signup createUser={spy}/>)

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')

      expect(spy.calls[0].arguments[0]).toEqual({email, password})
    })

    it('should set error if short password', function(){
      const email = 'rico@rico.fr'
      const password = '123'
      const spy = expect.createSpy()
      const wrapper = mount(<Signup createUser={spy}/>)

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')

      expect(wrapper.state('error')).toNotBe('')
    })

    it('should set createUser callback error', function() {
      const password = '1234'
      const reason = 'This is the reason'
      const spy = expect.createSpy()
      const wrapper = mount(<Signup createUser={spy}/>)

      wrapper.ref('password').node.value = password
      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[1]({reason})
      expect(wrapper.state('error')).toBe(reason)

      spy.calls[0].arguments[1]()
      expect(wrapper.state('error')).toBe('')
    })

  })

}
