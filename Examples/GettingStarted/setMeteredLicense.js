/**
 * This example demonstrates how to set Metered license.
 * Learn more about Metered license at https://purchase.groupdocs.com/faqs/licensing/metered.
 */
async function setMeteredLicense(groupdocs) {
  publicKey = '*****';
  privateKey = '*****';

  metered = new groupdocs.search.Metered();
  metered.setMeteredKey(publicKey, privateKey);

  console.log("License set successfully.");
}

module.exports = setMeteredLicense
