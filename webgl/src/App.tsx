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

const FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_Color;
void main() {
  gl_FragColor = u_Color;
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
    let u_Color = gl.getUniformLocation(gl.program, 'u_Color');
    if (!u_Color) {
      return;
    }
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);

    ref.current.addEventListener('click', (e) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      points.push([
        (e.offsetX - ref.current.width / 2) / (ref.current.width / 2),
        (ref.current.height / 2 - e.offsetY) / (ref.current.height / 2),
      ]);
      for (let point of points) {
        gl.vertexAttrib3f(a_Position, point[0], point[1], 0.0);
        gl.uniform4f(u_Color, Math.random(), Math.random(), Math.random(), Math.random());
        // gl.uniform4f(u_Color, 0.4, 1.0, 1.0, 1.0);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    });
  }, []);

  return (
    <div className="App">
      <canvas ref={ref}></canvas>
    </div>
  );
}

export default App;
