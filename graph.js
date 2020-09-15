import { Arc } from "./arc.js";

export class Graph {
  constructor() {
    this._vertices = new Set();
    this._arcs = new Set();

    this._matrix = new Map();
  }

  get matrix() {
    return this._matrix;
  }

  get vertices() {
    return this._vertices;
  }

  get arcs() {
    return this._arcs;
  }

  createRelation(from, to, length) {
    const adjacentFrom = this.matrix.get(from) || new Map();
    adjacentFrom.set(to, length);

    this.matrix.set(from, adjacentFrom);
  }

  addArc(arc) {
    if (arc instanceof Arc) {
      this.vertices.add(arc.from);
      this.vertices.add(arc.to);

      this.arcs.add(arc);

      this.createRelation(arc.from, arc.to, arc.length);

      return arc;
    }

    return null;
  }
}
