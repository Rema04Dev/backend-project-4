import fs from 'fs/promises';
import path from 'path';
import cheerio, { html } from 'cheerio';
import {
  buildName, urlToFilename, urlToDirname, formatName,
  loadContent
} from './util.js';
import axios from 'axios';

  const pageLoader = (url, outputPath = process.cwd()) => {
    const htmlFilename = urlToFilename(url);
    const assetsDirname = urlToDirname(url);
    const assetsDirpath = path.resolve(outputPath, assetsDirname)
    fs.mkdir(assetsDirpath)
    let htmldata;
    const imageLinks = [];
    return axios.get(url)
    .then(response => response.data)
    .then((html) => {
      const $ = cheerio.load(html);
      $('img').each(function() {
        const currentSrc = $(this).attr('src');
        imageLinks.push(currentSrc);
        const localSrc = path.join(assetsDirpath, formatName(currentSrc))
        $(this).attr('src', localSrc);
      })
      return $.html();
    })
    .then((html) => fs.writeFile(path.join(outputPath, htmlFilename), html))
    .then(() => {
      imageLinks.forEach((link) => {
        const { base } = path.parse(link);
        return axios(link, { responseType: 'arraybuffer' })
          .then((response) => response.data)
          .then((data) => fs.writeFile(path.join(assetsDirpath, base), data))
      })
    })
  };

const url = 'https://ru.hexlet.io/courses';
const outputPath = path.resolve('downloads')
pageLoader(url, outputPath);

export default pageLoader;