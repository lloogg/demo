//@ts-nocheck
import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
const VSHADER_SOURCE = `
attribute vec4 a_Position;

void main() {
  gl_Position = a_Position;
  gl_PointSize = 10.0;
}`;

const FSHADER_SOURCE = `void main() {
  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);
}`;
function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const points = [];
    let gl = getWebGLContext(ref.current);
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to initialize shaders');
      return;
    }

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);


    ref.current.addEventListener('click', (e) => {
      points.push([e.offsetX, e.offsetY]);
      for (let point of points) {
        gl.vertexAttrib3f(a_Position, point[0], point[1], 0.0);
      }
    })
  }, []);

  return (
    <div className="App">
      <canvas ref={ref}></canvas>
    </div>
  );
}

export default App;
