import * as THREE from 'three';
import React from 'react';
import { Canvas, useFrame, useLoader, useFBO } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Torus = props => {
  const torusRef = React.useRef();
  const mapRepeatSize = 1.1;
  const map = useLoader(TextureLoader, '/static/images/bagelTexture2.png');
  const displaceMap = useLoader(TextureLoader, '/static/images/bagelMap2.png');
  // const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
  //   TextureLoader,
  //   [
  //     '/static/images/PavingStones092_1K-JPG/PavingStones092_1K_Color.jpg',
  //     '/static/images/PavingStones092_1K-JPG/PavingStones092_1K_Displacement.jpg',
  //     '/static/images/PavingStones092_1K-JPG/PavingStones092_1K_NormalGL.jpg',
  //     '/static/images/PavingStones092_1K-JPG/PavingStones092_1K_Roughness.jpg',
  //     '/static/images/PavingStones092_1K-JPG/PavingStones092_1K_AmbientOcclusion.jpg',
  //   ]
  // );
  // map.magFilter = THREE.NearestFilter; // no effect
  // map.minFilter = THREE.LinearMipMapLinearFilter; // no effect
  // map.wrapS = map.wrapT = THREE.RepeatWrapping; // has effect
  // map.flipY = false; // has effect
  // map.repeat.set(mapRepeatSize, mapRepeatSize);
  // displaceMap.magFilter = THREE.NearestFilter; // no effect
  // displaceMap.minFilter = THREE.LinearMipMapLinearFilter; // no effect
  // displaceMap.wrapS = displaceMap.wrapT = THREE.RepeatWrapping; // has effect
  // displaceMap.flipY = true; // has effect
  // displaceMap.repeat.set(mapRepeatSize, mapRepeatSize);
  const TorusShaderMaterial = {
    uniforms: {
      time: { type: 'f', value: 0.0 },
      map: { type: 't', value: map },
      u_time: { type: 'f', value: 0 },
    },
    vertexShader: `
    precision mediump float;
    varying vec2 vUv;
    void main(){
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    }
    `,
    fragmentShader: `
    varying vec2 vUv;
    uniform float u_time;
    uniform float opacity;
    uniform sampler2D map;
    void main(){
        vec2 uv = vUv;
        float cb = floor((uv.x + u_time) * 40.);
        vec3 color = vec3(1.0,0.0,0.0) * opacity;
        vec4 mapTexel = texture2D( map, vUv.xy );
        gl_FragColor = vec4(mapTexel);
    }
    `,
  };

  // useFrame(({ clock }) => {
  //   torusRef.current.material.uniforms.u_time.value = clock.oldTime * 0.0001;
  // });

  return (
    <mesh ref={torusRef} {...props}>
      <torusGeometry args={[1.8, 1.2, 64, 64]} />
      {/* <meshStandardMaterial attach='material' map={colorMap} /> */}
      <meshPhongMaterial
        map={colorMap}
        displacementScale={0.1}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
      {/* <shaderMaterial attach='material' args={[TorusShaderMaterial]} /> */}
    </mesh>
  );
};

const BagelWebGl = () => {
  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <pointLight position={[5, 5, 5]} />
      <Torus rotation={[-Math.PI * 0.15, Math.PI * 0.95, 1]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default BagelWebGl;
