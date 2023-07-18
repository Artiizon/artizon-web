import { Canvas } from "@react-three/fiber"
import { Environment, Center } from "@react-three/drei"

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

import { useSnapshot } from 'valtio';
import state from '../store';

const CanvasModel = () => {

  const snap = useSnapshot(state);

  const groupRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMouseDownRef = useRef(false);

  useEffect(() => {
    const onMouseDown = (event) => {
      event.preventDefault();
      isMouseDownRef.current = true;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const onMouseMove = (event) => {
      event.preventDefault();
      if (isMouseDownRef.current) {
        const deltaX = event.clientX - mouseRef.current.x;
        const deltaY = event.clientY - mouseRef.current.y;
        rotateModel(deltaX, deltaY);
        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
      }
    };

    const onMouseUp = () => {
      isMouseDownRef.current = false;
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const rotateModel = (deltaX, deltaY) => {
    const rotationSpeed = 0.01;
    const rotation = groupRef.current.rotation;
    rotation.y += deltaX * rotationSpeed;
    // rotation.x += deltaY * rotationSpeed;
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 22 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-wfull h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          {snap.page === 'customizor' && (
            <group ref={groupRef}>
              <Shirt />
            </group>
          )}
          {snap.page === 'customizor' || (
            <Shirt />
          )}
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel