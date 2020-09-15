import { Graph } from "./graph.js";
import { Vertex } from "./vertex.js";

export class PathFinder {
  constructor(graph) {
    this._graph = graph;

    this._distances = new Map();
    this._visited = new Map();
    this._prev = new Map();
  }

  get prev() {
    return this._prev;
  }

  get visited() {
    return this._visited;
  }

  get graph() {
    return this._graph;
  }

  get distances() {
    return this._distances;
  }

  isCompleted() {
    return [...this.visited.values()].every((value) => value);
  }

  findMinMark() {
    let min = Infinity;
    let minKey = null;

    this.distances.forEach((value, key) => {
      if (value < min && !this.visited.get(key)) {
        minKey = key;
        min = value;
      }
    });

    return minKey;
  }

  findPath(from) {
    if (this.graph instanceof Graph && from instanceof Vertex) {
      const vertices = this.graph.vertices;
      const matrix = this.graph.matrix;
      const distances = this.distances;
      const visited = this.visited;
      const prev = this.prev;

      for (let vertex of vertices) {
        distances.set(vertex, Infinity);
        visited.set(vertex, false);
        prev.set(vertex, from);
      }

      distances.set(from, 0);

      while (!this.isCompleted()) {
        const minMarkVertex = this.findMinMark();

        const children = matrix.get(minMarkVertex);
        const minMark = distances.get(minMarkVertex);

        if (children) {
          children.forEach((length, adjacent) => {
            const currentMark = distances.get(adjacent);

            if (currentMark > minMark + length) {
              distances.set(adjacent, minMark + length);
              prev.set(adjacent, minMarkVertex);
            }
          });
        }

        visited.set(minMarkVertex, true);
      }

      const pathTo = (to) => {
        if (to instanceof Vertex && from !== to) {
          const path = [to];

          let currentVertex = to;

          while (currentVertex !== from) {
            const parent = prev.get(currentVertex);
            path.unshift(parent);

            currentVertex = parent;
          }

          return path;
        }

        return [];
      };

      return {
        distances,
        pathTo,
      };
    }

    return null;
  }

  findAllPaths() {
    const paths = new Map();

    for (let firstVertex of this.graph.vertices) {
      const pathsFrom = paths.get(firstVertex) || new Map();

      const { pathTo } = this.findPath(firstVertex);

      for (let secondVertex of this.graph.vertices) {
        const pathsTo = paths.get(secondVertex) || new Map();
        const path = pathsFrom.get(secondVertex) || [];

        if (firstVertex !== secondVertex && !pathsFrom.get(secondVertex)) {
          const foundPath = pathTo(secondVertex);
          path.push(...foundPath);
          pathsTo.set(firstVertex, path.slice().reverse());
        }

        paths.set(secondVertex, pathsTo);
        pathsFrom.set(secondVertex, path);
      }

      paths.set(firstVertex, pathsFrom);
    }

    return paths;
  }
}
