function edge(x1, y1, x2, y2, e) {
  let x = e.offsetX;
  let y = e.offsetY;
  let xMin = x1;
  let xMax = x2;
  let yMin = y1;
  let yMax = y2;
  if (x1 > x2) {
    xMin = x2;
    xMax = x1;
  }
  if (y1 > y2) {
    yMin = y2;
    yMax = y1;
  }
  // vertical
  if (x1 === x2) {
    // if (x === x1 && y < yMax && y > yMin) {
    //   return 'vertical';
    // }
    if (Math.abs(x - x1) < 5 && y < yMax && y > yMin) {
      return 'vertical';
    }
    // horizontal
  } else if (y1 === y2) {
    // if (y === y1 && x < xMax && x > xMin) {
    //   return 'horizontal';
    // }
    if (Math.abs(y - y1) < 5 && x < xMax && x > xMin) {
      return 'horizontal';
    }
  }
}
