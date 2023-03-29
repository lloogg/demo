//@ts-nocheck
import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
const VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
void main() {
  gl_Position = u_ModelMatrix * a_Position ;
  gl_PointSize = 10.0;
}`;

const FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_Color;
void main() {
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}`;
let g_last = Date.now();
let angleStep = 100;

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
    const angle = (Math.PI * 30) / 180;
    const tx = 0.4,
      ty = 0.2,
      tz = 0;
    const u_Rotate = gl.getUniformLocation(gl.program, 'u_Rotate');
    const u_Translate = gl.getUniformLocation(gl.program, 'u_Translate');
    //prettier-ignore
    const rotateMatrix = new Float32Array([
      Math.cos(angle), Math.sin(angle), 0, 0,
      -Math.sin(angle), Math.cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
    //prettier-ignore
    const translateMatrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      tx, ty, tz, 1,
    ]);
    gl.uniformMatrix4fv(u_Rotate, false, rotateMatrix);
    gl.uniformMatrix4fv(u_Translate, false, translateMatrix);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
  }

  function main() {
    function tick() {
      currentAngle = animate(currentAngle);
      draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
      requestAnimationFrame(tick);
    }

    let gl = getWebGLContext(ref.current);
    // 旋转速度（度/秒）
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to initialize shaders');
      return;
    }

    let n = initVertexBuffers(gl);

    if (n < 0) {
      console.log('Failed to set the position of the vertices');
      return;
    }

    let currentAngle = 0;
    let modelMatrix = new Matrix4();
    const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    tick();
  }

  function draw(gl, n, currentAngle, modelMatrix: Matrix4, u_ModelMatrix) {
    modelMatrix.setRotate(currentAngle, 0.5, 0.5, 1);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  function animate(angle: number) {
    const now = Date.now();
    const elapsed = now - g_last;
    g_last = Date.now();
    const newAngle = angle + (angleStep * elapsed) / 1000;
    return newAngle % 360;
  }

  useEffect(() => {
    main();
  }, []);

  return <canvas ref={ref}></canvas>;
}

export default App;
