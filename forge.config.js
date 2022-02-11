const  path = require('path');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env')
} );

function notarizeMaybe() {
  if (process.platform !== 'darwin') {
    return;
  }

  // if (!process.env.CI) {
  //   console.log(`Not in CI, skipping notarization`);
  //   return;
  // }

  if (!process.env.NOTORIZE_APPLE_ID || !process.env.NOTORIZE_APPLE_PASS) {
    console.warn(
      'Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!',
    );
    return;
  }

  config.packagerConfig.osxNotarize = {
    appBundleId: process.env.NOTORIZE_APPLE_BUNDLE,
    appleId: process.env.NOTORIZE_APPLE_ID,
    appleIdPassword: process.env.NOTORIZE_APPLE_PASS,
    ascProvider: process.env.NOTORIZE_APPLE_PROVIDER,
  };
}

const config = {
    "packagerConfig": {
        "osxSign": {
          "identity": process.env.NOTORIZE_APPLE_IDENTITY,
          "hardened-runtime": true,
          "entitlements": "entitlements.plist",
          "entitlements-inherit": "entitlements.plist",
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": process.env.NOTORIZE_APPLE_ID,
          "appleIdPassword": process.env.NOTORIZE_APPLE_PASS,
        }
      },
      "publishers": [
        {
          "name": "@electron-forge/publisher-github",
          "config": {
            "repository": {
              "owner": process.env.REPO_USER,
              "name": process.env.REPO_NAME,
              "draft": true
            }
          },
          "draft": true
        }
      ],
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "electron_autoupdate"
          }
        },
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-dmg",
          "config": {}
        }
      ]
}


notarizeMaybe();

module.exports = config;
