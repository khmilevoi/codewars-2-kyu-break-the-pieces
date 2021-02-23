import { ShapeParser } from "./shapeParser.js";

const breakPieces = (shapeStr) => {
  const parser = new ShapeParser(shapeStr);
  const shapes = parser.parse();
  parser.print();

  return shapes.map((shape) => shape.toString());
};

const shape = [
  "+------------+",
  "|            |",
  "|            |",
  "|            |",
  "+------+---+-+",
  "|      +---+ |",
  "|      |   +-+",
  "++-+---+     |",
  "|+-+       +-+",
  "+----------+-+",
].join("\n");

// const shape = [
//   "+------------+",
//   "|            |",
//   "|            |",
//   "|            |",
//   "+------+-----+",
//   "|      |     |",
//   "|      |     |",
//   "+------+-----+",
// ].join("\n");

// const shape =
//   "+-----------------+\n" +
//   "|                 |\n" +
//   "|   +-------------+\n" +
//   "|   |\n" +
//   "|   |\n" +
//   "|   |\n" +
//   "|   +-------------+\n" +
//   "|                 |\n" +
//   "|                 |\n" +
//   "+-----------------+";

// const shape =
//   "+---+------------+---+\n" +
//   "|   |            |   |\n" +
//   "+---+------------+---+\n" +
//   "|   |            |   |\n" +
//   "|   |            |   |\n" +
//   "|   |            |   |\n" +
//   "|   |            |   |\n" +
//   "+---+------------+---+\n" +
//   "|   |            |   |\n" +
//   "+---+------------+---+";

console.log(shape);
breakPieces(shape).forEach((item) => console.log(item));
