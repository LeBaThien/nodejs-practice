import { promises as fsPromises } from "fs";
import { dirname } from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename, getPageLinks } from "./utils.js";
import { promisify } from "util";

function download(url, filename) {
  console.log(`Downloading ${url}`);

  let content;
  return superagent.get(url)
    .get(url)
    .then((res) => {
      content = res.text;
      return mkdirPromises(dirname(filename));
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`);
      return content;
    });
}

function spiderLinks(currentUrl, content, nesting) {}

const spidering = new Set();
export function spider(url, nesting) {
  if (spidering.has(url)) {
    return Promise.resolve();
  }

  spidering.add(url);

  const filename = urlToFilename(url);
  return fsPromises
    .readFile(filename, "utf8")
    .catch((err) => {
      if (err.code !== "ENOENT") {
        throw err;
      }

      return download(url, filename);
    })
    .then((content) => spiderLinks(url, content, nesting));
}
