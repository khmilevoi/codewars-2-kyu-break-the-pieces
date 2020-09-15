import { Identify } from "./identify.js";

export class Arc extends Identify {
  constructor(from, to, length, id) {
    super("arc", id);

    this._from = from;
    this._to = to;
    this._length = length;
  }

  get length() {
    return this._length;
  }

  get from() {
    return this._from;
  }

  get to() {
    return this._to;
  }

  reverse() {
    return new Arc(this.to, this.from, this.length);
  }

  includes(vertex) {
    return this.from === vertex || this.to === vertex;
  }
}
