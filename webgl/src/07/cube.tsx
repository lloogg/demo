//@ts-nocheck
import { useEffect, useRef, useState } from 'react';
const VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_mvpMatrix;
varying vec4 v_Color;
void main() {
  gl_Position = u_mvpMatrix * a_Position;
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
  const [near, setNear] = useState(1);
  const [far, setFar] = useState(100);
  const [fov, setFov] = useState(30);
  function initVertexBuffers(gl) {
    //prettier-ignore
    const verticesColors = new Float32Array([
      // Vertex coordinates and color
       1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v0 White
      -1.0,  1.0,  1.0,     1.0,  0.0,  1.0,  // v1 Magenta
      -1.0, -1.0,  1.0,     1.0,  0.0,  0.0,  // v2 Red
       1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  // v3 Yellow
       1.0, -1.0, -1.0,     0.0,  1.0,  0.0,  // v4 Green
       1.0,  1.0, -1.0,     0.0,  1.0,  1.0,  // v5 Cyan
      -1.0,  1.0, -1.0,     0.0,  0.0,  1.0,  // v6 Blue
      -1.0, -1.0, -1.0,     0.0,  0.0,  0.0   // v7 Black
    ]);

    // Indices of the vertices
    // prettier-ignore
    const indices = new Uint8Array([
      0, 1, 2,   0, 2, 3,    // front
      0, 3, 4,   0, 4, 5,    // right
      0, 5, 6,   0, 6, 1,    // up
      1, 6, 7,   1, 7, 2,    // left
      7, 4, 3,   7, 3, 2,    // down
      4, 7, 6,   4, 6, 5     // back
   ]);
    const vertexColorBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    if (!vertexColorBuffer || !indexBuffer) {
      console.log('Fail to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

    const floatSize = verticesColors.BYTES_PER_ELEMENT;

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, floatSize * 6, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
      console.log('Failed to get the storage location of a_Color');
      return -1;
    }
    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      floatSize * 6,
      floatSize * 3,
    );
    gl.enableVertexAttribArray(a_Color);

    // Write the indices to the buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    return indices.length;
  }

  function main() {
    let x = 3;
    let y = 3;
    let z = 7;
    document.addEventListener('click', (e) => {
      if (e.button === 0) {
        x++;
      } else if (e.button === 2) {
        y++;
      }
    });

    function draw() {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    }
    function tick() {
      mvpMatrix.setPerspective(
        fov,
        ref.current.width / ref.current.height,
        near,
        far,
      );
      mvpMatrix.lookAt(x, y, z, 0, 0, 0, 0, 1, 0);
      

      gl.uniformMatrix4fv(u_mvpMatrix, false, mvpMatrix.elements);
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
    const u_mvpMatrix = gl.getUniformLocation(gl.program, 'u_mvpMatrix');

    const mvpMatrix = new Matrix4();

    return tick();
  }

  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          setFar((far) => far + 1);
          break;
        case 'ArrowRight':
          setFar((far) => far - 1);
          break;
        case 'ArrowUp':
          setNear((near) => near + 0.01);
          break;
        case 'ArrowDown':
          setNear((near) => near - 0.01);
          break;
        case 'h':
          setFov((fov) => fov + 1);
          break;
        case 'j':
          setFov((fov) => fov - 1);
          break;
        default:
          break;
      }
    });
  }, []);
  useEffect(() => {
    const animationId = main();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [near, far, fov]);

  return (
    <div>
      <canvas width={500} height={500} ref={ref}></canvas>
      <div>far: {far}</div>
      <div>near: {near}</div>
      <div>fov: {fov}</div>
    </div>
  );
}

export default App;
