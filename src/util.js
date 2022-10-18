import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';

// names & urls
const formatName = (name) => name
  .match(/\w*/gi)
  .filter((word) => word)
  .join('-');

export const buildName = (url, cusomOptions = {}) => {
  const { dir, name } = path.parse(url);
  const basename = formatName(path.join(dir, name));
  return basename;
}

export const urlToFilename = (url, defaultExtension = 'html') => {
  const ext = path.extname(url) || defaultExtension;
  return `${buildName(url)}.${ext}`
};

export const urlToDirname = (url, postfix = '_files') => `${buildName(url)}${postfix}`;

// loading
export const loadContent = (url) => axios.get(url, { responseType: 'arraybuffer' })
export const loadPage = (url) => axios.get(url)
export const createFile = (filepath, data) => fs.writeFile(filepath, data);
export const writeFile = (url, outputPath) => loadPage(url)
  .then((data) => createFile(outputPath, data))
