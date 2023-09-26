import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useParams } from 'react-router';

import Canvas from "../canvas"
import state from '../store';

const CustomerViewTshirt = () => {
  const snap = useSnapshot(state);

  state.page = 'no-canvas';

  const {color} = useParams();

  return (
    <AnimatePresence>
        <>
        Color:{color}
        <Canvas />
        </>
    </AnimatePresence>
  )
}

export default CustomerViewTshirt