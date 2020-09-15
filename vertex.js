import { Identify } from "./identify.js";

export class Vertex extends Identify {
  constructor(x, y, id) {
    super("vertex", id);

    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  distanceTo(vertex) {
    if (vertex instanceof Vertex) {
      return Math.sqrt(
        Math.abs(vertex.x - this.x) ** 2 + Math.abs(vertex.y - this.y)
      );
    }

    return Infinity;
  }
}
