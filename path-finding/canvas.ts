export function createCanvas(width: number, height: number) {
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', `${width}`);
  canvas.setAttribute('height', `${height}`);
  canvas.setAttribute('transform', 'translate(0.5, 0.5)');
  document.body.append(canvas);

  return canvas;
}
