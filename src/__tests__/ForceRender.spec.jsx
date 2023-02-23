import React, { useState, useCallback } from 'react'
import { mount } from '@cypress/react'
import ReactSpeedometer from '../index'

function ForceRender() {
  const [value, setValue] = useState(333)
  const [segments, setSegments] = useState(5)
  const [forceRender, setForceRender] = useState(false)

  const normalUpdate = useCallback(() => {
    setValue(777)
  }, [])

  const forceUpdate = useCallback(() => {
    setValue(417)
    setForceRender(true)
    setSegments(10)
  }, [])

  return (
    <div>
      <div>{'porumai ... force rendering'}</div>
      <div>
        <button
          id={'force-render'}
          onClick={() => {
            forceUpdate()
          }}
        >
          {'Force Render'}
        </button>
        <button
          id={'normal-update'}
          onClick={() => {
            normalUpdate()
          }}
        >
          {'Normal Update'}
        </button>
      </div>
      <ReactSpeedometer
        value={value}
        segments={segments}
        forceRender={forceRender}
      />
    </div>
  )
}

describe('Force Render of React Speedometer is working fine', () => {
  it('updates component normally', () => {
    mount(<ForceRender />)

    // now we can use any Cypress command to interact with the component
    // https://on.cypress.io/api
    cy.contains('333')
    cy.get('.speedo-segment').should('have.length', 5)

    // click the button
    cy.get('button#normal-update').click()

    // now we should have the updated value
    cy.contains('777')

    // we did not force rendered; our segments should be the same(5)
    cy.get('.speedo-segment').should('have.length', 5)
  })

  it('force renders the component with correct value', () => {
    mount(<ForceRender />)

    // now we can use any Cypress command to interact with the component
    // https://on.cypress.io/api
    cy.contains('333')
    cy.get('.speedo-segment').should('have.length', 5)

    // click the button
    cy.get('button#force-render').click()

    // now we should have the updated value
    cy.contains('417')

    // we force rendered; our segments should be 10 (from 5)
    cy.get('.speedo-segment').should('have.length', 10)
  })
})
