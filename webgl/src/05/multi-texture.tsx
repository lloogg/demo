//@ts-nocheck
import { useEffect, useRef } from 'react';
const VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;

varying vec4 v_Color;
void main() {
  gl_Position =  a_Position ;
  gl_PointSize = 10.0;
  v_TexCoord = a_TexCoord;
}`;

const FSHADER_SOURCE = `
precision mediump float;
uniform sampler2D u_Sampler0;
uniform sampler2D u_Sampler1;
varying vec2 v_TexCoord;


void main() {
  vec4 color1 = texture2D(u_Sampler0, v_TexCoord);
  vec4 color2 = texture2D(u_Sampler1, v_TexCoord);
  gl_FragColor = color1 * color2;
}`;

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  function initVertexBuffers(gl) {
    //prettier-ignore
    const verticesColors = new Float32Array([
      -0.5, 0.5, -0.3, 1.7,
      -0.5, -0.5, -0.3, -0.2,
      0.5, 0.5, 1.7, 1.7,
      0.5, -0.5, 1.7, -0.2,
    ]);
    const n = 4;
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
    const a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    const floatSize = verticesColors.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, floatSize * 4, 0);

    gl.vertexAttribPointer(
      a_TexCoord,
      2,
      gl.FLOAT,
      false,
      floatSize * 4,
      floatSize * 2,
    );
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_TexCoord);

    return n;
  }
  let g_texUnit0 = false;
  let g_texUnit1 = false;
  function loadTexture(gl, n, texture, u_Sampler, image, texUnit) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    if (texUnit == 0) {
      gl.activeTexture(gl.TEXTURE0); // 开启0号纹理单元
      g_texUnit0 = true;
    } else if (texUnit == 1) {
      gl.activeTexture(gl.TEXTURE1);
      g_texUnit1 = true;
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    // 将 0 号纹理传递给着色器
    gl.uniform1i(u_Sampler, texUnit);

    if (g_texUnit0 && g_texUnit1) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    }
  }

  function initTextures(gl, n) {
    const texture0 = gl.createTexture();
    const texture1 = gl.createTexture();
    const u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    const u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');

    const image0 = new Image();
    const image1 = new Image();
    image0.addEventListener('load', () => {
      loadTexture(gl, n, texture0, u_Sampler0, image0, 0);
    });
    image1.addEventListener('load', () => {
      loadTexture(gl, n, texture1, u_Sampler1, image1, 1);
    });
    image0.src = '/sky.jpg';
    image1.src = '/circle.gif';
    return true;
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

    if (!initTextures(gl, n)) {
      return;
    }
  }

  useEffect(() => {
    main();
  }, []);

  return <canvas ref={ref}></canvas>;
}

export default App;
