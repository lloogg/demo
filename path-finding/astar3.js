"use strict";
exports.__esModule = true;
// f(n) = g(n) + h(n)
// closedSet: nodes that alreay been evaluated
// openSet: nodes need to be evaluated
var canvas_1 = require("./canvas");
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.containsPoint = function (point) {
        if (point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height) {
            return true;
        }
        return false;
    };
    return Rectangle;
}());
var Point = /** @class */ (function () {
    function Point(x, y, isVisited) {
        if (isVisited === void 0) { isVisited = false; }
        this.x = x;
        this.y = y;
        this.isVisited = isVisited;
        this.init();
    }
    Point.prototype.init = function () {
        this.isVisited = false;
        this.g = Number.MAX_VALUE;
        this.f = Number.MAX_VALUE;
        this.h = 0;
        this.cameFrom = undefined;
    };
    return Point;
}());
function heuristic(a, b) {
    //   return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    // return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    return Math.hypot(a.x - b.x, a.y - b.y);
}
function getLowestFPointInOpenSet(openSet) {
    return openSet.reduce(function (memo, current) {
        return current.f < memo.f ? current : memo;
    });
}
function getDirection(current, cameFrom) {
    if (current.x === cameFrom.x) {
        return current.y - cameFrom.y > 0 ? 'bottom' : 'top';
    }
    if (current.y === cameFrom.y) {
        return current.x - cameFrom.x > 0 ? 'right' : 'left';
    }
}
var width = 1000;
var height = 1000;
var canvas = (0, canvas_1.createCanvas)(width, height);
var ctx = canvas.getContext('2d');
var rectangles = [];
var interval;
function astar(source, target, width, height) {
    var pointMap = new Map();
    function getNeighbors(point) {
        var x = point.x;
        var y = point.y;
        var neighbors = {};
        // right
        if (x < width - 1) {
            var key = "".concat(x + 1, " ").concat(y);
            var right = pointMap.get(key);
            if (right === undefined) {
                right = new Point(x + 1, y);
                pointMap.set(key, right);
            }
            neighbors.right = right;
        }
        // left
        if (x > 0) {
            var key = "".concat(x - 1, " ").concat(y);
            var left = pointMap.get(key);
            if (left === undefined) {
                left = new Point(x - 1, y);
                pointMap.set(key, left);
            }
            neighbors.left = left;
        }
        // top
        if (y > 0) {
            var key = "".concat(x, " ").concat(y - 1);
            var top_1 = pointMap.get(key);
            if (top_1 === undefined) {
                top_1 = new Point(x, y - 1);
                pointMap.set(key, top_1);
            }
            neighbors.top = top_1;
        }
        // bottom
        if (y < height - 1) {
            var key = "".concat(x, " ").concat(y + 1);
            var bottom = pointMap.get(key);
            if (bottom === undefined) {
                bottom = new Point(x, y + 1);
                pointMap.set(key, bottom);
            }
            neighbors.bottom = bottom;
        }
        for (var key in neighbors) {
            var neighbor = neighbors[key];
            for (var _i = 0, rectangles_1 = rectangles; _i < rectangles_1.length; _i++) {
                var rectangle = rectangles_1[_i];
                if (rectangle.containsPoint(neighbor) || neighbor.isVisited) {
                    delete neighbors[key];
                }
            }
        }
        return neighbors;
    }
    var openSet = [];
    openSet.push(source);
    source.isVisited = true;
    // source.f = 0;
    source.g = 0;
    source.f = heuristic(source, target);
    // pointMap.set(`${source.x} ${source.y}`, source);
    // while (openSet.length !== 0) {
    var previousDirection;
    interval = setInterval(function () {
        if (openSet.length !== 0) {
            var current = getLowestFPointInOpenSet(openSet);
            if (current !== source && !previousDirection) {
                previousDirection = getDirection(current, current.cameFrom);
            }
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'red';
            for (var _i = 0, rectangles_2 = rectangles; _i < rectangles_2.length; _i++) {
                var rect = rectangles_2[_i];
                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            }
            ctx.fillStyle = 'red';
            for (var _a = 0, openSet_1 = openSet; _a < openSet_1.length; _a++) {
                var point = openSet_1[_a];
                ctx.fillRect(point.x, point.y, 1, 1);
            }
            ctx.fillStyle = 'black';
            pointMap.forEach(function (value, key) {
                var point = value;
                if (point.isVisited) {
                    ctx.fillRect(point.x, point.y, 1, 1);
                }
            });
            ctx.fillStyle = 'blue';
            for (var i = current; i != source; i = i.cameFrom) {
                ctx.fillRect(i.x, i.y, 1, 1);
            }
            if (current.x === target.x && current.y === target.y) {
                // return current;
                clearInterval(interval);
            }
            // remove current in openSet
            var currentIndex = openSet.indexOf(current);
            openSet.splice(currentIndex, 1);
            current.isVisited = true;
            // let current = queue.shift();
            var neighbors = getNeighbors(current);
            for (var key in neighbors) {
                var neighbor = neighbors[key];
                var tempG = current.g + 1;
                if (getDirection(neighbor, current) === previousDirection) {
                    tempG = current.g;
                }
                if (tempG < neighbor.g || !openSet.includes(neighbor)) {
                    neighbor.cameFrom = current;
                    neighbor.g = tempG;
                    neighbor.h = heuristic(neighbor, target);
                    neighbor.f = neighbor.g + 100 * neighbor.h;
                    openSet.push(neighbor);
                }
            }
        }
        else {
            clearInterval(interval);
        }
    }, 1);
    // }
}
function main() {
    rectangles.push(new Rectangle(30, 30, 150, 350));
    rectangles.push(new Rectangle(230, 30, 350, 350));
    rectangles.push(new Rectangle(20, 430, 880, 20));
    ctx.fillStyle = 'red';
    for (var _i = 0, rectangles_3 = rectangles; _i < rectangles_3.length; _i++) {
        var rect = rectangles_3[_i];
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
    canvas.addEventListener('mousemove', function (e) {
        clearInterval(interval);
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'red';
        for (var _i = 0, rectangles_4 = rectangles; _i < rectangles_4.length; _i++) {
            var rect = rectangles_4[_i];
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
        var source = new Point(1, 2);
        var target = new Point(e.offsetX, e.offsetY);
        astar(source, target, width, height);
    });
}
main();
