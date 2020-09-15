import {Vertex} from "./vertex.js";

export class Shape {
  constructor(vertices = []) {
    this._vertices = vertices;

    this._canvas = null;
    this._normalized = [];
  }

  get normalized() {
    return this._normalized;
  }

  set normalized(value) {
    this._normalized = value;
  }

  get canvas() {
    return this._canvas;
  }

  set canvas(value) {
    this._canvas = value;
  }

  get vertices() {
    return this._vertices;
  }

  createCanvas() {
    const [minX, minY, maxX, maxY] = this.vertices.reduce(
      ([minX, minY, maxX, maxY], vertex) => [
        Math.min(minX, vertex.x),
        Math.min(minY, vertex.y),
        Math.max(maxX, vertex.x),
        Math.max(maxY, vertex.y),
      ],
      [Infinity, Infinity, -Infinity, -Infinity]
    );

    const minVertex = new Vertex(minX, minY);
    const normalized = this.normalize(minVertex);

    const canvas = Array.from(Array(maxY - minY + 1), () =>
      Array.from(Array(maxX - minX + 1).fill(" "))
    );

    this.normalized = normalized;
    return (this.canvas = canvas);
  }

  normalize(vertex) {
    if (vertex instanceof Vertex) {
      return this.vertices.map(
        (item) => new Vertex(item.x - vertex.x, item.y - vertex.y, item.id)
      );
    }

    return this.vertices.slice();
  }

  getCenter() {
    const [sumX, sumY] = this.vertices
      .slice(1)
      .reduce(([x, y], vertex) => [x + vertex.x, y + vertex.y], [0, 0]);

    const length = this.vertices.length - 1;

    const centeredX = sumX / length;
    const centeredY = sumY / length;

    return new Vertex(centeredX, centeredY);
  }

  calculateArea() {
    const sum = this.vertices.slice(0, -1).reduce((sum, vertex, index) => {
      const nextVertex = this.vertices[index + 1];

      const x = vertex.x + nextVertex.x;
      const y = vertex.y - nextVertex.y;

      return sum + x * y;
    }, 0);

    return 0.5 * Math.abs(sum);
  }

  isInside(vertex) {
    if (vertex instanceof Vertex) {
      if (this.vertices.length < 3) {
        return false;
      }

      const normalized = this.normalize(vertex);

      const sum = normalized.slice(1).reduce((sum, current, index) => {
        const prev = normalized[index];

        const div = prev.x * current.y - current.x * prev.y;
        const diff = current.x * prev.x + current.y * prev.y;

        const left = Math.atan((prev.x ** 2 + prev.y ** 2 - diff) / div);
        const right = Math.atan((current.x ** 2 + current.y ** 2 - diff) / div);

        return sum + left + right;
      }, 0);

      return Math.floor(Math.abs(sum)) !== 0;
    }

    return false;
  }

  isHollow(shapes = []) {
    const personalArea = this.calculateArea();

    for (let shape of shapes) {
      if (shape instanceof Shape && shape !== this) {
        const currentArea = shape.calculateArea();
        const currentCenter = shape.getCenter();

        if (currentArea < personalArea) {
          const vertices = [currentCenter, ...shape.vertices].filter(
            (vertex) => !this.vertices.includes(vertex)
          );

          for (let vertex of vertices) {
            if (this.isInside(vertex)) {
              debugger;

              return false;
            }
          }
        }
      }
    }

    debugger;

    return true;
  }

  renderItem(from, to) {
    if (from instanceof Vertex && to == null) {
      return "+";
    } else if (from instanceof Vertex && to instanceof Vertex) {
      if (from.y - to.y === 0) {
        return "-";
      } else if (from.x - to.x === 0) {
        return "|";
      }
    }

    return " ";
  }

  toString() {
    const canvas = this.createCanvas();
    const normalized = this.normalized;

    normalized.forEach((vertex) => {
      canvas[vertex.y][vertex.x] = this.renderItem(vertex);
    });

    normalized.slice(1).forEach((to, index) => {
      const from = normalized[index];

      const symbol = this.renderItem(from, to);

      const fromX = Math.min(from.x, to.x);
      const toX = Math.max(from.x, to.x);

      const fromY = Math.min(from.y, to.y);
      const toY = Math.max(from.y, to.y);

      for (let x = fromX; x < toX + 1; ++x) {
        for (let y = fromY; y < toY + 1; ++y) {
          if (canvas[y][x] !== "+") {
            canvas[y][x] = symbol;
          }
        }
      }
    });

    normalized.forEach((vertex) => {
      if (
        canvas[vertex.y - 1] &&
        canvas[vertex.y + 1] &&
        canvas[vertex.y - 1][vertex.x] === canvas[vertex.y + 1][vertex.x] &&
        canvas[vertex.y - 1][vertex.x] === "|"
      ) {
        canvas[vertex.y][vertex.x] = "|";
      }

      if (
        canvas[vertex.y][vertex.x - 1] === canvas[vertex.y][vertex.x + 1] &&
        canvas[vertex.y][vertex.x - 1] === "-"
      ) {
        canvas[vertex.y][vertex.x] = "-";
      }
    });

    return canvas.map((line) => line.join("").trimEnd()).join("\n");
  }
}
