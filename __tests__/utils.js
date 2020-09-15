import fs from "fs";
import child_process from "child_process";

const tests = [];
const testStatistics = [];

export const it = (name, test) => {
  tests.push(() => {
    console.deferredLog("\n- ", name);

    test();
  });
};

export const describe = (name, test) => {
  test();

  let error = null;
  const logs = [];

  console.oldLog = console.log;
  console.oldAssert = console.assert;

  console.deferredLog = (...args) => {
    logs.push(args);
  };
  console.log = (...args) => {
    console.deferredLog(...args);
    console.oldLog(...args);
  };
  console.assert = (condition, ...data) => {
    if (!condition) {
      throw data;
    }

    return console.oldAssert(condition, ...data);
  };

  try {
    tests.forEach((test) => test());
  } catch (err) {
    error = err;
  }

  console.log = console.oldLog;
  console.assert = console.oldAssert;

  const testResult = `[TEST] ${name}: ` + (error ? "DENIED" : "SUCCESS");
  testStatistics.push(testResult);

  console.log(`\n${testResult}`);

  logs.forEach((log) => console.log(...log));

  if (error) {
    if (Array.isArray(error)) {
      console.log("[ERROR]: \n", error.join("\n"));
    } else {
      console.log("[ERROR]: ", error);
    }
  }
};

const path = "./__tests__";

export const runTests = () => {
  fs.readdir(path, (err, files) => {
    if (err) {
      console.log("[ERROR]: ", err);
    }

    files.forEach((file) => {
      if (file.includes(".spec.js")) {
        const command = `node ${path}/${file}`;

        child_process.exec(command, (err, stdout, stderr) => {
          if (err) {
            console.log("[ERROR]: ", err);
          }

          console.log("File: ", file);
          console.log("\n[RESULT]:\n\n");
          console.log(stdout);
          console.log("\n[ERRORS]:");
          console.log(stderr);
        });
      }
    });
  });
};

export const compareArrays = (left = [], right = []) =>
  left.every((value, index) => value === right[index]);
