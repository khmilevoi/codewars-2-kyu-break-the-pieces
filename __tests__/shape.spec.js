import { describe, it } from "./utils.js";
import { Shape } from "../shape.js";
import { Vertex } from "../vertex.js";

const shape1 = new Shape([
  new Vertex(0, 0),
  new Vertex(0, 1),
  new Vertex(1, 1),
  new Vertex(1, 0),
  new Vertex(0, 0),
]);

const shape2 = new Shape([
  new Vertex(1, 0),
  new Vertex(1, 1),
  new Vertex(0, 1),
  new Vertex(0, 3),
  new Vertex(1, 3),
  new Vertex(1, 2),
  new Vertex(2, 2),
  new Vertex(2, 0),
  new Vertex(1, 0),
]);

describe("shape calculations tests", () => {
  it("simple figure", () => {
    const area = shape1.calculateArea();
    console.assert(area === 1, "Should be 1");

    const center = shape1.getCenter();
    console.assert(
      center.x === 0.5 && center.y === 0.5,
      "Should be (0.5, 0.5)"
    );

    const outsideVertices = [
      new Vertex(2, 2),
      new Vertex(2, 1),
      new Vertex(-1, -1),
      new Vertex(-1, 0),
    ];

    const insideVertices = [
      center,
      new Vertex(0.5, 0.4),
      new Vertex(0.4, 0.4),
      new Vertex(0.1, 0.1),
      new Vertex(0.9, 0.9),
    ];

    console.log("outsideVertices");

    for (let outsideVertex of outsideVertices) {
      console.assert(
        !shape1.isInside(outsideVertex),
        outsideVertex,
        "Must be outside"
      );
    }

    console.log("insideVertices");

    for (let insideVertex of insideVertices) {
      console.assert(
        shape1.isInside(insideVertex),
        insideVertex,
        "Must be inside"
      );
    }
  });

  it("difficult figure", () => {
    const area = shape2.calculateArea();
    console.assert(area === 4, "Should be 4", area);

    const center = shape2.getCenter();

    const outsideVertices = [
      new Vertex(0, 0),
      new Vertex(2, 3),
      new Vertex(0.5, 0.5),
      new Vertex(1.5, 2.5),
    ];

    const insideVertices = [
      center,
      new Vertex(1.5, 0.5),
      new Vertex(0.5, 1.5),
      new Vertex(1, 1.5),
    ];

    console.log("outsideVertices");

    for (let outsideVertex of outsideVertices) {
      console.assert(
        !shape2.isInside(outsideVertex),
        outsideVertex,
        "Must be outside"
      );
    }

    console.log("insideVertices");

    for (let insideVertex of insideVertices) {
      console.assert(
        shape2.isInside(insideVertex),
        insideVertex,
        "Must be inside"
      );
    }
  });
});

const shape3 = new Shape([
  new Vertex(0, 0),
  new Vertex(0, 2),
  new Vertex(2, 2),
  new Vertex(2, 0),
  new Vertex(0, 0),
]);

const shape4 = new Shape([
  new Vertex(2, 0),
  new Vertex(2, 2),
  new Vertex(0, 2),
  new Vertex(0, 6),
  new Vertex(2, 6),
  new Vertex(2, 4),
  new Vertex(4, 4),
  new Vertex(4, 0),
  new Vertex(2, 0),
]);

describe("shape printing tests", () => {
  it("simple shape", () => {
    const visualisation = shape3.toString();

    console.log("visualisation:\n", visualisation);

    const result = ["+-+", "| |", "+-+"].join("\n");

    console.assert(
      visualisation === result,
      "Should coincide",
      result,
      visualisation
    );
  });

  it("difficult shape", () => {
    const visualisation = shape4.toString();

    console.log('visualisation:\n', visualisation);

    const result = [
      "  +-+",
      "  | |",
      "+-+ |",
      "|   |",
      "| +-+",
      "| |  ",
      "+-+  ",
    ].join("\n");

    console.assert(
      visualisation === result,
      "Should coincide",
      result,
      visualisation
    );
  });
});