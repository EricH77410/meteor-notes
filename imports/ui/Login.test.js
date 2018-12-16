import { Meteor } from 'meteor/meteor'
import React from 'react';
import expect from 'expect'
import { mount } from 'enzyme'

import { Login } from './Login'

if (Meteor.isClient) {

  describe('Login', function() {

    it('should show error messages in a paragrap tag', function() {
      const error = 'This is not working'
      const wrapper = mount(<Login loginWithPassword={()=>{}} />)

      wrapper.setState({ error })

      const p = wrapper.find('p').text()
      expect(p).toBe(error)

      wrapper.setState({error:''})
      expect(wrapper.find('p').length).toBe(0)
    })

    it('should call loginWithPassword with the form data', function() {
      const email = 'rico@club.fr'
      const pwd = '123'
      const spy = expect.createSpy()
      const wrapper = mount(<Login loginWithPassword={spy}/>)

      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = pwd

      wrapper.find('form').simulate('submit')

      expect(spy.calls[0].arguments[0]).toEqual({ email })
      expect(spy.calls[0].arguments[1]).toBe(pwd)
    })

    it('should set login with loginWithPassword callback errors', function() {
      const spy = expect.createSpy()
      const wrapper = mount(<Login loginWithPassword={spy}/>)

      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[2]({})
      expect(wrapper.state('error')).toNotBe('')

      spy.calls[0].arguments[2]()
      expect(wrapper.state('error')).toBe('')
    })
  })

}
