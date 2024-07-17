const java = require('java');
const Utils = require('../../utils');

/**
 * This example demonstrates how to install a license from a stream.
 */
async function setLicenseFromStream(groupdocs) {
  let InputStream = java.import('java.io.FileInputStream');

  try {
    const stream = new InputStream(Utils.LicensePath);

    const license = new groupdocs.search.License();
    await license.setLicense(stream);
    console.log('License set successfully.');
  } catch {
    console.log(
      '\nWe do not ship any license with this example. ' +
        '\nVisit the GroupDocs site to obtain either a temporary or permanent license. ' +
        '\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. ' +
        '\nLearn how to request a temporary license at https://purchase.groupdocs.com/temporary-license.',
    );
  }
}

module.exports = setLicenseFromStream;
