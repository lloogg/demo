//@ts-nocheck
import { useEffect, useRef } from 'react';
const VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute float a_PointSize;
void main() {
  gl_Position = a_Position ;
  gl_PointSize = a_PointSize;
}`;

const FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_Color;
void main() {
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}`;
let angleStep = 1;

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  function initVertexBuffers(gl) {
    //prettier-ignore
    const verticesSizes = new Float32Array([
        0, 0.5, 100.0,
        -0.5, -0.5, 20.0,
        0.5, -0.5 ,30.0
    ]);
    const n = 3;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Fail to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);
    let FSIZE = verticesSizes.BYTES_PER_ELEMENT;
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);

    gl.vertexAttribPointer(
      a_PointSize,
      1,
      gl.FLOAT,
      false,
      FSIZE * 3,
      FSIZE * 2,
    );

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_PointSize);

    return n;
  }

  function main() {
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
    gl.drawArrays(gl.POINTS, 0, n);
  }

  useEffect(() => {
    main();
  }, []);

  return <canvas ref={ref}></canvas>;
}

export default App;
