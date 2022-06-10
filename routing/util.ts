export function createSvg(width: number, height: number) {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);
  svg.setAttribute('transform', 'translate(0.5, 0.5)');
  document.body.append(svg);
  return svg;
}
