import path from 'path';
import axios from 'axios';

// names & urls
export const formatName = (name) => name
  .match(/\w*/gi)
  .filter((word) => word)
  .join('-');

export const buildName = (url) => {
  const { dir, name } = path.parse(url);
  const basename = formatName(path.join(dir, name));
  return basename;
};

export const urlToFilename = (url, ext = 'html') => {
  const { host, pathname } = new URL(url);
  const basename = formatName(`${host}${pathname}`);
  return `${basename}.${ext}`;
};

export const urlToDirname = (url, postfix = '_files') => {
  const { host, pathname } = new URL(url);
  const basename = formatName(`${host}${pathname}`)
  return `${buildName(basename)}${postfix}`;
};

// loading
export const loadContent = (url) => axios.get(url, { responseType: 'arraybuffer' })
  .then((response) => response.data);