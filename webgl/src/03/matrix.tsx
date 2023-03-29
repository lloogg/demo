//@ts-nocheck
import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
const VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform mat4 u_Rotate;
uniform mat4 u_Translate;
void main() {
  gl_Position = u_Translate * u_Rotate * a_Position ;
  gl_PointSize = 10.0;
}`;

const FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_Color;
void main() {
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}`;
function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  function initVertexBuffers(gl) {
    const vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5]);
    const n = 3;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Fail to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const tx = 0.4,
      ty = 0.2,
      tz = 0;
    const u_Rotate = gl.getUniformLocation(gl.program, 'u_Rotate');
    const u_Translate = gl.getUniformLocation(gl.program, 'u_Translate');
    const rotateMatrix = new Matrix4();
    rotateMatrix.setRotate(30, 0, 0, 1);

    const translateMatrix = new Matrix4();
    translateMatrix.translate(tx, ty, tz);
    
    gl.uniformMatrix4fv(u_Rotate, false, rotateMatrix.elements);
    gl.uniformMatrix4fv(u_Translate, false, translateMatrix.elements);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
  }

  useEffect(() => {
    const points = [];
    let gl = getWebGLContext(ref.current);
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to initialize shaders');
      return;
    }

    let n = initVertexBuffers(gl);

    if (n < 0) {
      console.log('Failed to set the position of the vertices');
      return;
    }

    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
  }, []);

  return <canvas ref={ref}></canvas>;
}

export default App;
