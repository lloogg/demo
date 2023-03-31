//@ts-nocheck
import { useEffect, useRef } from 'react';
const VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute float a_PointSize;
attribute vec4 a_Color;
varying vec4 v_Color;
void main() {
  gl_Position =  a_Position ;
  gl_PointSize = a_PointSize;
  v_Color = a_Color;
}`;

const FSHADER_SOURCE = `
precision mediump float;
varying vec4 v_Color;


void main() {
  gl_FragColor = v_Color;
}`;

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  function initVertexBuffers(gl) {
    //prettier-ignore
    const verticesColors = new Float32Array([
        0, 0.5, 1, 0, 0, 10,
        -0.5, 0, 0, 1, 0, 10,
        0.5, 0, 0, 0, 1, 10
    ]);
    const n = 3;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Fail to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    const floatSize = verticesColors.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, floatSize * 6, 0);
    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      floatSize * 6,
      floatSize * 2,
    );
    gl.vertexAttribPointer(
      a_PointSize,
      1,
      gl.FLOAT,
      false,
      floatSize * 6,
      floatSize * 5,
    );
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_PointSize);
    gl.enableVertexAttribArray(a_Color);

    
    return n;
  }

  function main() {
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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  useEffect(() => {
    main();
  }, []);

  return <canvas ref={ref}></canvas>;
}

export default App;
