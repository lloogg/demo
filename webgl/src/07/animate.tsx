//@ts-nocheck
import { useEffect, useRef } from 'react';
const VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ModelMatrix;
varying vec4 v_Color;
void main() {
  gl_Position = u_ViewMatrix * a_Position;
  v_Color = a_Color;
}
`;

const FSHADER_SOURCE = `
precision mediump float;
varying vec4 v_Color;

void main () {
    gl_FragColor = v_Color;
}
`;

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  function initVertexBuffers(gl) {
    //prettier-ignore
    const verticesColors = new Float32Array([
        // Vertex coordinates and color(RGBA)
        0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
        -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
        0.5, -0.5,  -0.4,  1.0,  0.4,  0.4, 
        
        0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
        -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
        0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 
    
        0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
        -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
        0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 
    ]);
    const n = 9;
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Fail to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    const floatSize = verticesColors.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, floatSize * 6, 0);
    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      floatSize * 6,
      floatSize * 3,
    );

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_Color);

    return n;
  }

  function main() {
    let x = 0.2;
    let y = 0.25;
    let z = 0.25;
    let i = -1;
    function draw() {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, n);
    }
    function tick() {
      z += 0.01 * i;
      if (z < -1) {
        i = 1;
      } else if (z > 1) {
        i = -1;
      }

      viewMatrix.setLookAt(x, y, z, 0, 0, 0, 0, 1, 0);
      gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
      draw();
      requestAnimationFrame(tick);
    }
    const gl = getWebGLContext(ref.current);
    // 旋转速度（度/秒）
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to initialize shaders');
      return;
    }

    const n = initVertexBuffers(gl);

    if (n < 0) {
      console.log('Failed to set the position of the vertices');
      return;
    }
    const u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    const viewMatrix = new Matrix4(u_ViewMatrix);

    tick();
  }

  useEffect(() => {
    main();
  }, []);

  return <canvas width={500} height={500} ref={ref}></canvas>;
}

export default App;
