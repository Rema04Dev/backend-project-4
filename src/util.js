import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import cheerio from 'cheerio';

// names & urls
export const formatName = (name) => name
  .match(/\w*/gi)
  .filter((word) => word)
  .join('-');

export const buildName = (url, cusomOptions = {}) => {
  const { dir, name } = path.parse(url);
  const basename = formatName(path.join(dir, name));
  return basename;
};

export const urlToFilename = (url, defaultExtension = 'html') => {
  const { host, pathname } = new URL(url);
  const ext = path.extname(url) || defaultExtension;
  const basename = formatName(`${host}${pathname}`);
  return `${buildName(basename)}.${ext}`;
};

export const urlToDirname = (url, postfix = '_files') => {
  const { host, pathname } = new URL(url);
  const basename = formatName(`${host}${pathname}`)
  return `${buildName(basename)}${postfix}`;
};
// loading

export const loadContent = (url) => axios.get(url, { responseType: 'arraybuffer' })
  .then((response) => response.data);