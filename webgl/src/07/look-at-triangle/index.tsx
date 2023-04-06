//@ts-nocheck
import { useEffect, useRef } from 'react';
import VSHADER_SOURCE from './index.vert?raw';

import FSHADER_SOURCE from './index.frag?raw';

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
    const u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    const viewMatrix = new Matrix4(u_ViewMatrix);
    // 视点、观察目标点、上方向
    viewMatrix.setLookAt(0.2, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  useEffect(() => {
    main();
  }, []);

  return <canvas width={500} height={500 } ref={ref}></canvas>;
}

export default App;
