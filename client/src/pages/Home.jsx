import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { useEffect } from "react";

import state from "../store";
import { CustomButton } from "../components";

import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from "../config/motion";

const Home = () => {
    const snap = useSnapshot(state)
    
    useEffect(() => {
        document.getElementById("main-btn").className = "get-started"
    }, [])

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className="home" {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img 
                            src="./Logo.png"
                            alt="logo"
                            className="w-64 h-64 object-contain"
                        />
                    </motion.header>
                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className="head-text">
                                LET'S <br className="x1:block hidden" /> DO IT.
                            </h1>
                        </motion.div>
                        <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                            <p className="max-w-md font-normal text-gray-600">
                                Create your unique and exclusive shirt with our brand-new 3d customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
                            </p>

                            <CustomButton
                                // type="filled"
                                title="Customize It"
                                handleClick={() => state.intro = false}
                                // customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home