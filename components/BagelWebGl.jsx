import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const TorusShaderMaterial = {
  uniforms: {
    u_time: { type: 'f', value: 0 },
  },
  vertexShader: `
    precision mediump float;
    varying vec2 vUv;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float u_time;
    void main() {
      vec2 uv = vUv;
      float cb = floor((uv.x + u_time) * 40.);
      gl_FragColor = vec4(mod(cb, 2.0),0.,0.,1.);
    }
  `,
};

const Torus = props => {
  const torusRef = React.useRef();

  useFrame(({ clock }) => {
    torusRef.current.material.uniforms.u_time.value = clock.oldTime * 0.0001;
  });

  return (
    <mesh ref={torusRef} {...props}>
      <torusGeometry args={[1.8, 1.2, 64, 64]} />
      <shaderMaterial attach='material' args={[TorusShaderMaterial]} />
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
