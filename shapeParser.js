import { Arc } from "./arc.js";
import { Graph } from "./graph.js";
import { Vertex } from "./vertex.js";
import { PathFinder } from "./pathFinder.js";
import { Shape } from "./shape.js";

export class ShapeParser {
  constructor(shape) {
    this._shapeString = shape;

    this._graph = null;
    this._shapes = [];
  }

  get shapes() {
    return this._shapes;
  }

  set shapes(value) {
    this._shapes = value;
  }

  get shapeString() {
    return this._shapeString;
  }

  get graph() {
    return this._graph;
  }

  set graph(value) {
    this._graph = value;
  }

  createArc(length, vertices) {
    if (length >= 0 && vertices.length > 1) {
      const [from, to] = vertices.slice(-2);

      const difference = Math.max(to.x - from.x, to.y - from.y) - 1;

      if (difference === length) {
        return new Arc(from, to, 1);
      }
    }

    return null;
  }

  createGraph() {
    const lines = this.shapeString.split("\n").map((line) => line.split(""));

    const vertices = [];

    const vertexColLengths = {};
    const verticesOnCol = {};

    const graph = new Graph();

    lines.forEach((line, row) => {
      let vertexRowLength = 0;
      const verticesOnLine = [];

      line.forEach((symbol, col) => {
        if (symbol === "+") {
          const vertex = new Vertex(col, row);
          verticesOnLine.push(vertex);

          verticesOnCol[col] = verticesOnCol[col] || [];
          verticesOnCol[col].push(vertex);

          const rowArc = this.createArc(vertexRowLength, verticesOnLine);
          const colArc = this.createArc(
            vertexColLengths[col],
            verticesOnCol[col]
          );

          if (rowArc) {
            graph.addArc(rowArc);
            graph.addArc(rowArc.reverse());
          }

          if (colArc) {
            graph.addArc(colArc);
            graph.addArc(colArc.reverse());
          }

          vertexRowLength = 0;
          vertexColLengths[col] = 0;
        } else if (symbol === "-") {
          vertexRowLength += 1;
        } else if (symbol === "|") {
          vertexColLengths[col] = vertexColLengths[col] || 0;
          vertexColLengths[col] += 1;
        }
      });

      vertices.push(...verticesOnLine);
    });

    return (this.graph = graph);
  }

  print() {
    const lines = this.shapeString.split("\n").map((line) => line.split(""));

    const vertices = [...this.graph.vertices];

    lines.forEach((line, row) => {
      let str = "";

      line.forEach((symbol, col) => {
        const vertex = vertices.find((v) => v.x === col && v.y === row);

        if (vertex) {
          str += vertex.key;
        } else {
          str += symbol;
        }
      });

      console.log(str);
    });
  }

  isIntersect(pathFrom = [], pathTo = []) {
    return pathFrom
      .slice(1)
      .every((vertex) => !pathTo.slice(1).includes(vertex));
  }

  notInclude(shapes = [], path = []) {
    for (let shape of shapes) {
      const matched = path.filter((item) => shape.vertices.includes(item));

      if (
        matched.length === path.length &&
        shape.vertices.length === path.length
      ) {
        return false;
      }
    }

    return true;
  }

  parse() {
    const graph = this.createGraph();

    const finder = new PathFinder(graph);
    const paths = finder.findAllPaths();

    const shapes = this.shapes;

    for (let vertex of graph.vertices) {
      for (let arc of graph.arcs) {
        if (vertex instanceof Vertex && arc instanceof Arc) {
          if (!arc.includes(vertex)) {
            const pathFrom = [...paths.get(vertex).get(arc.from)];
            const pathTo = [...paths.get(vertex).get(arc.to)];

            if (this.isIntersect(pathFrom, pathTo)) {
              const vertices = [...pathFrom, ...pathTo.reverse()];

              if (this.notInclude(shapes, vertices)) {
                const shape = new Shape(vertices);

                shapes.push(shape);
              }
            }
          }
        }
      }
    }

    debugger;

    return (this.shapes = shapes.filter((shape) => shape.isHollow(shapes)));
  }
}
