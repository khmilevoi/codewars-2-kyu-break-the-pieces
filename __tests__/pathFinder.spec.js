import { compareArrays, describe, it } from "./utils.js";
import { Graph } from "../graph.js";
import { Vertex } from "../vertex.js";
import { Arc } from "../arc.js";
import { PathFinder } from "../pathFinder.js";

const v = [
  new Vertex(0, 0),
  new Vertex(0, 0),
  new Vertex(0, 0),
  new Vertex(0, 0),
  new Vertex(0, 0),
];

const arcs = [
  new Arc(v[0], v[1], 10),
  new Arc(v[0], v[2], 30),
  new Arc(v[0], v[3], 50),
  new Arc(v[0], v[4], 10),

  new Arc(v[2], v[4], 10),

  new Arc(v[3], v[1], 40),
  new Arc(v[3], v[2], 40),

  new Arc(v[4], v[0], 10),
  new Arc(v[4], v[2], 10),
  new Arc(v[4], v[3], 30),
];

const graph = new Graph();

const correctDistances = [0, 10, 20, 40, 10];
const correctPath = [v[0], v[4], v[2]];

arcs.forEach((arc) => graph.addArc(arc));

describe("path tests", () => {
  it("should work",  () => {
    const finder = new PathFinder(graph);

    const { distances, pathTo } = finder.findPath(v[0]);

    const matchDistances = compareArrays(
      [...distances.values()],
      correctDistances
    );

    console.assert(matchDistances, "Should find shortest paths");

    const matchPath = compareArrays(pathTo(v[2]), correctPath);

    console.assert(matchPath, "Should find shortest path from A to C");
  });
});
