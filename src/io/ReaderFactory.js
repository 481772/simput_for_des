import vtkHttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import JSONModelReader from 'simput/src/io/JSONModelReader';
import ZipModelReader from 'simput/src/io/ZipModelReader';

const READER_MAPPING = {};

const FETCH_DATA = {
  readAsArrayBuffer(url, progressCallback) {
    return vtkHttpDataAccessHelper.fetchBinary(url, { progressCallback });
  },
  readAsText(url, progressCallback) {
    return vtkHttpDataAccessHelper.fetchText({}, url, { progressCallback });
  },
};

function registerReader({
  extension,
  name,
  Reader,
  readMethod,
  parseMethod,
  fileNameMethod,
  binary,
}) {
  READER_MAPPING[extension] = {
    name,
    Reader,
    readMethod: readMethod || binary ? 'readAsArrayBuffer' : 'readAsText',
    parseMethod: parseMethod || binary ? 'parseAsArrayBuffer' : 'parseAsText',
    fileNameMethod,
  };
}

function getReader({ name }) {
  const ext = name
    .split('.')
    .pop()
    .toLowerCase();
  return READER_MAPPING[ext];
}

function listReaders() {
  return Object.keys(READER_MAPPING).map((ext) => ({
    name: READER_MAPPING[ext].name,
    ext,
  }));
}

function listSupportedExtensions() {
  return Object.keys(READER_MAPPING);
}

// ----------------------------------------------------------------------------

let filesCallback = null;

function handleFile(e) {
  if (filesCallback) {
    filesCallback(e.target.files);
  }
  filesCallback = null;
}

const HIDDEN_FILE_ELEMENT = document.createElement('input');
HIDDEN_FILE_ELEMENT.setAttribute('type', 'file');
HIDDEN_FILE_ELEMENT.setAttribute('multiple', 'multiple');
HIDDEN_FILE_ELEMENT.addEventListener('change', handleFile);

// ----------------------------------------------------------------------------

function openFiles(extensions, onFilesCallback) {
  filesCallback = onFilesCallback;
  HIDDEN_FILE_ELEMENT.setAttribute(
    'accept',
    extensions.map((t) => `.${t}`).join(',')
  );
  HIDDEN_FILE_ELEMENT.value = null;
  HIDDEN_FILE_ELEMENT.click();
}

// ----------------------------------------------------------------------------

function readRawData({ fileName, data }) {
  return new Promise((resolve, reject) => {
    const readerMapping = getReader({ name: fileName });
    if (readerMapping) {
      const { Reader, parseMethod, fileNameMethod } = readerMapping;
      const reader = new Reader();
      if (fileNameMethod) {
        reader[fileNameMethod](fileName);
      }
      const ds = reader[parseMethod](data);
      Promise.resolve(ds)
        .then((dataset) => resolve({ dataset, reader, name: fileName }))
        .catch(reject);
    } else {
      reject();
    }
  });
}

// ----------------------------------------------------------------------------

function readFile(file) {
  return new Promise((resolve, reject) => {
    const readerMapping = getReader(file);
    if (readerMapping) {
      const { readMethod } = readerMapping;
      const io = new FileReader();
      io.onload = function onLoad() {
        readRawData({ fileName: file.name, data: io.result })
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      };
      io[readMethod](file);
    } else {
      reject(new Error('No reader mapping'));
    }
  });
}

// ----------------------------------------------------------------------------

function loadFiles(files) {
  const promises = [];
  for (let i = 0; i < files.length; i += 1) {
    promises.push(readFile(files[i]));
  }
  return Promise.all(promises);
}

// ----------------------------------------------------------------------------

function downloadDataset(fileName, url, progressCallback) {
  return new Promise((resolve, reject) => {
    const readerMapping = getReader({ name: fileName });
    if (readerMapping) {
      const { readMethod } = readerMapping;
      FETCH_DATA[readMethod](url, progressCallback)
        .then((rawData) => {
          if (rawData) {
            readRawData({ fileName, data: rawData })
              .then((result) => resolve(result))
              .catch((error) => reject(error));
          } else {
            throw new Error(`No data for ${fileName}`);
          }
        })
        .catch(reject);
    } else {
      throw new Error(`No reader found for ${fileName}`);
    }
  });
}

// ----------------------------------------------------------------------------
// Register default readers
// ----------------------------------------------------------------------------

registerReader({
  extension: 'json',
  name: 'JSONSimputReader',
  Reader: JSONModelReader,
  binary: false,
});

registerReader({
  extension: 'zip',
  name: 'ZipSimputModelReader',
  Reader: ZipModelReader,
  binary: true,
});

export default {
  downloadDataset,
  openFiles,
  loadFiles,
  registerReader,
  listReaders,
  listSupportedExtensions,
};
