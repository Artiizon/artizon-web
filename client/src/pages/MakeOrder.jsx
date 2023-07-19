import { motion, AnimatePresence, color } from "framer-motion";
import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import axios from "axios";

import state from "../store";
import { CustomButton } from "../components";

import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation, fadeAnimation } from "../config/motion";

const MakeOrder = () => {
    const snap = useSnapshot(state)

    const [amount, setAmount] = useState('');
    const [material, setMaterial] = useState('');
    
    useEffect(() => {
        document.getElementById("main-btn").className = "get-started"
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const color = snap.tcolor;
        const logo = snap.logoDecal;

        axios.post('http://localhost:8080/order', {amount, material, color, logo}).then(res => {
            console.log(res);
            state.page = 'home';
        }).catch(err => {
            console.log(err);
        }
        )
    }

    return (
        <AnimatePresence>
            {snap.page=='makeorder' && (
                <>
                <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                    <CustomButton
                        type='filled'
                        title='Go Back'
                        handleClick={() => state.page = 'customizor'}
                        customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                    />
                </motion.div>

                <div className="p-3 bg-gray-200 justify-center flex">
                        <form onSubmit={handleSubmit}>
                            <h1>Make Your T-Shirt Order</h1>
                            <div className="m">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" className="form-control" placeholder="How many T-shirts do you need" onChange={e => setAmount(e.target.value)} />
                            </div>
                            <div className="">
                                <label htmlFor="material">T-Shirt Material</label>
                                <select name="material" className="form-control" onChange={e => setMaterial(e.target.value)}>
                                    <option value="">Material</option>
                                    <option value="Cotton">Cotton</option>
                                    <option value="Silk">Silk</option>
                                </select>
                            </div>
                            <button className="">Submit</button>
                        </form>
                </div>
              </>
            )}
        </AnimatePresence>
    )
}

export default MakeOrder