import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);

  if (state.tstyle === 'standard') {
    var { nodes, materials } = useGLTF('/standard.glb');
  } else if (state.tstyle === 'collar') {
    var { nodes, materials } = useGLTF('/collar.glb');
  }

  // console.log(nodes, materials);

  if (sessionStorage.getItem('tcolor') ) {
    const tcolor = sessionStorage.getItem('tcolor');
    state.tcolor = tcolor;
  }
  if (sessionStorage.getItem('logo') ) {
    const file = sessionStorage.getItem('logo');
    state.logoDecal = file;
  }
  if (sessionStorage.getItem('logo1') ) {
    const file1 = sessionStorage.getItem('logo1');
    state.logoDecal1 = file1;
  }
  if (sessionStorage.getItem('logo2') ) {
    const file2 = sessionStorage.getItem('logo2');
    state.logoDecal2 = file2;
  }

  const logoTexture = useTexture(snap.logoDecal);
  const logoTexture1 = useTexture(snap.logoDecal1);
  const logoTexture2 = useTexture(snap.logoDecal2);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => easing.dampC(materials.Material.color, snap.tcolor, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.Material}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0.1]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            // map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isLogoTexture1 && (
          <Decal
            position={[-0.06, 0.06, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.06}
            map={logoTexture1}
            // map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {snap.isLogoTexture2 && (
          <Decal
            position={[0.06, 0.06, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.06}
            map={logoTexture2}
            // map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}

      </mesh>
    </group>
  )
}

export default Shirt