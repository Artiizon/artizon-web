import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import Canvas from "../canvas"
import state from '../store';
import axios from "axios";

const CustomerViewTshirt = () => {
  const snap = useSnapshot(state);

  state.page = 'no-canvas';

  return (
    <>
    <AnimatePresence>
        <>
        <Canvas />
        </>
    </AnimatePresence>
    </>
  )
}

export default CustomerViewTshirt