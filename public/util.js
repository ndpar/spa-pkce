/**
 * Generates a cryptographically secure random string
 * of variable length.
 *
 * The returned string is also url-safe.
 *
 * @param {Number} length bytes of entropy in the random string.
 * @returns {String}
 */
function randomString(length) {
  let array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return bufferToBase64UrlEncoded(array);
}

/**
 * Takes a base64 encoded string and returns a url encoded string
 * by replacing the characters + and / with -, _ respectively,
 * and removing the = (fill) character.
 *
 * @param {String} input base64 encoded string.
 * @returns {String}
 */
function urlEncodeB64(input) {
  const b64Chars = {'+': '-', '/': '_', '=': ''};
  return input.replace(/[\+\/=]/g, m => b64Chars[m]);;
}

/**
 * Takes an ArrayBuffer and convert it to Base64 url encoded string.
 * @param {ArrayBuffer} input
 * @returns {String}
 */
function bufferToBase64UrlEncoded(input) {
  var bytes = new Uint8Array(input);
  return urlEncodeB64(window.btoa(String.fromCharCode(...bytes)));
}

/**
 * Returns the sha256 digst of a given message.
 * This function is async.
 *
 * @param {String} message
 * @returns {Promise<ArrayBuffer>}
 */
function sha256(message) {
  let encoder = new TextEncoder();
  let data = encoder.encode(message);
  return window.crypto.subtle.digest('SHA-256', data);
}

/**
 * fetch the openid configuration for the issuer
 * @returns {Promise<any>}
 */
async function getConfig() {
  const response = await fetch(`https://${AUTH0_DOMAIN}/.well-known/openid-configuration`);
  return response.json();
}
