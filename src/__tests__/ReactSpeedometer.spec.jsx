import React from 'react'
import { mount } from '@cypress/react'
import ReactSpeedometer from '../index'

describe('React Speedometer', () => {
  it('Renders the component with correct default value', () => {
    mount(<ReactSpeedometer />)

    // now we can use any Cypress command to interact with the component
    // https://on.cypress.io/api
    cy.contains('0')
  })

  it('Renders the component with correct value prop', () => {
    mount(<ReactSpeedometer value={333} />)

    cy.contains('333')
  })
})
