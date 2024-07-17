const fs = require('fs');
const java = require('java');
const localBasePath = __dirname;

class Utils {
  constructor() {
    this.LicensePath = 'C:/Licenses/GroupDocs.Search.Node.jsviaJava.lic';
    this.BasePath = localBasePath;

    this.DocumentsPath = localBasePath + '/Resources/Documents/';
    this.DocumentsPath2 = localBasePath + '/Resources/Documents2/';
    this.DocumentsPath3 = localBasePath + '/Resources/Documents3/';
    this.DocumentsPath4 = localBasePath + '/Resources/Documents4/';
    this.ImagesPath = localBasePath + '/Resources/Images/';
    this.DocumentsPNG = localBasePath + '/Resources/DocumentsPNG/';
    this.PasswordProtectedDocumentsPath = localBasePath + '/Resources/PasswordProtectedDocuments/';
    this.LogPath = localBasePath + '/Resources/Log/';
    this.DocumentsUtf32Path = localBasePath + '/Resources/DocumentsUtf32/';
    this.ArchivesPath = localBasePath + '/Resources/Archives/';

    this.OldIndexPath = localBasePath + '/Resources/Index_19_4/';

    this.OuputFolder = '/output/';
    this.OutputPath = localBasePath + this.OuputFolder;
  }

  printHeader(parts) {
    console.log();
    console.log();
    console.log();
    console.log(('Example / ' + parts.join(' / ') + ' ').padEnd(118, '='));
  }

  printHeaderFromPath(path) {
    const index = path.indexOf(this.OuputFolder);
    const parts = path.substring(index + this.OuputFolder.length).split('/');
    while (parts.length > 0 && parts[0] === '.') {
      parts.shift();
    }
    while (parts.length > 0 && parts[parts.length - 1].startsWith('Index')) {
      parts.pop();
    }
    this.printHeader(parts);
  }

  traceResult(query, result) {
    console.log();
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
  }

  traceIndexedDocuments(index) {
    console.log();
    console.log('Indexed documents:');
    const documents = index.getIndexedDocuments();
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      console.log('\t' + document.getFilePath());
    }
  }

  createDate(year, month, dayOfMonth) {
    const calendar = java.callStaticMethodSync('java.util.Calendar', 'getInstance');
    calendar.set(java.getStaticFieldValue('java.util.Calendar', 'YEAR'), year);
    calendar.set(java.getStaticFieldValue('java.util.Calendar', 'MONTH'), month - 1);
    calendar.set(java.getStaticFieldValue('java.util.Calendar', 'DAY_OF_MONTH'), dayOfMonth);
    const date = calendar.getTime();
    return date;
  }

  readBinaryFile(filePath) {
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(fileSizeInBytes);
    fs.readSync(fd, buffer, 0, fileSizeInBytes, 0);
    return buffer;
  }

  cleanDirectory(directoryPath) {
    fs.rmSync(directoryPath, { recursive: true, force: true });
  }

  copyFiles(sourcePath, destinationPath) {
    fs.cpSync(sourcePath, destinationPath, { recursive: true });
  }
}

module.exports = new Utils();
