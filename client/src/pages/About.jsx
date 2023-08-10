import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const About = () => {

    const snap = useSnapshot(state)

    state.page = 'no-canvas';

  return (
    <div>About</div>
  )
}

export default About