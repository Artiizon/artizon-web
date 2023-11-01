import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import Canvas from "../canvas"
import state from '../store';
import axios from "axios";

const CustomerViewTshirt = () => {
  const snap = useSnapshot(state);

  state.page = 'no-canvas';

  const [customerAuth, setCustomerAuth] = useState(false);
    const [email, setEmail] = useState("");

    axios.defaults.withCredentials = true;

    useEffect(() => {
      axios.get("http://localhost:8080/verifyCustomer").then((res) => {
        if (res.data.Status === "Success_Authentication") {
          setCustomerAuth(true);
          setEmail(res.data.email);
        } else {
          setCustomerAuth(false);
        }
      });
    }, []);

  return (
    <>
    {customerAuth && (
    <AnimatePresence>
        <>
        <Canvas />
        </>
    </AnimatePresence>
    )}
    </>
  )
}

export default CustomerViewTshirt