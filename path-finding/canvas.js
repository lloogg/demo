"use strict";
exports.__esModule = true;
exports.createSvg = exports.createCanvas = void 0;
function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', "".concat(width));
    canvas.setAttribute('height', "".concat(height));
    canvas.setAttribute('transform', 'translate(0.5, 0.5)');
    document.body.append(canvas);
    return canvas;
}
exports.createCanvas = createCanvas;
function createSvg(width, height) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', "".concat(width));
    svg.setAttribute('height', "".concat(height));
    svg.setAttribute('transform', 'translate(0.5, 0.5)');
    document.body.append(svg);
    return svg;
}
exports.createSvg = createSvg;
