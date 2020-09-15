import { describe, it } from "./utils.js";
import { ShapeParser } from "../shapeParser.js";

const shape1 = [
  "+------------+",
  "|            |",
  "|            |",
  "|            |",
  "+------+-----+",
  "|      |     |",
  "|      |     |",
  "+------+-----+",
].join("\n");

const solution1 = [
  [
    "+------------+",
    "|            |",
    "|            |",
    "|            |",
    "+------------+",
  ].join("\n"),
  ["+------+", "|      |", "|      |", "+------+"].join("\n"),
  ["+-----+", "|     |", "|     |", "+-----+"].join("\n"),
];

const shape2 =
  "+-----------------+\n" +
  "|                 |\n" +
  "|   +-------------+\n" +
  "|   |\n" +
  "|   |\n" +
  "|   |\n" +
  "|   +-------------+\n" +
  "|                 |\n" +
  "|                 |\n" +
  "+-----------------+";

const solution2 =
  "+-----------------+\n" +
  "|                 |\n" +
  "|   +-------------+\n" +
  "|   |\n" +
  "|   |\n" +
  "|   |\n" +
  "|   +-------------+\n" +
  "|                 |\n" +
  "|                 |\n" +
  "+-----------------+";

describe("general tests", () => {
  // it("1", () => {
  //   const parser = new ShapeParser(shape1);
  //   const shapes = parser.parse();
  //
  //   const visualizations = shapes.map((shape) => shape.toString()).sort();
  //
  //   for (let index in solution1.sort()) {
  //     console.assert(
  //       visualizations[index] === solution1[index],
  //       "Should consider",
  //       visualizations[index],
  //       solution1[index]
  //     );
  //   }
  // });

  it("2", () => {
    const parser = new ShapeParser(shape2);
    const shapes = parser.parse();

    const visualizations = shapes.map((shape) => shape.toString()).sort();

    for (let index in [solution2]) {
      console.log(visualizations[index]);

      console.assert(
        visualizations[index] === solution1[index],
        "Should consider",
        visualizations[index],
        solution2[index]
      );
    }
  });
});