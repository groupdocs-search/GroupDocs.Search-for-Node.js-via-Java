const fs = require('fs');
const Utils = require('../../utils');

/**
 * This example demonstrates how to install a license from a file.
 */
async function setLicenseFromFile(groupdocs) {
  if (fs.existsSync(Utils.LicensePath)) {
    const license = new groupdocs.search.License()
    license.setLicense(Utils.LicensePath);
    console.log('License set successfully.')
  } else {
    console.log("\nWe do not ship any license with this example. " +
    "\nVisit the GroupDocs site to obtain either a temporary or permanent license. " +
    "\nLearn more about licensing at https://purchase.groupdocs.com/faqs/licensing. " +
    "\nLearn how to request a temporary license at https://purchase.groupdocs.com/temporary-license.");
  }
}

module.exports = setLicenseFromFile
