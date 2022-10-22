import { 
  formatName,
  urlToFilename,
  urlToDirname
} from "../src/util.js";

const testCases = [
  {
    recived: 'https://ru.hexlet.io',
    formattedName: 'https-ru-hexlet-io',
    filename: 'ru-hexlet-io.html',
    dirname: 'ru-hexlet-io_files'
  },
  {
    recived: 'https://ru.hexlet.io/courses',
    formattedName: 'https-ru-hexlet-io-courses',
    filename: 'ru-hexlet-io-courses.html',
    dirname: 'ru-hexlet-io-courses_files'
  }
];

test.each(testCases)('names', ({ 
  recived, 
  formattedName, 
  filename, 
  dirname }) => {
  expect(formatName(recived)).toBe(formattedName);
  expect(urlToFilename(recived)).toBe(filename);
  expect(urlToDirname(recived)).toBe(dirname);
});
