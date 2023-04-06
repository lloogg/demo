import { Canvas } from '@react-three/fiber';
import { Mesh, ObjectLoader } from 'three/src/Three';
export function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
