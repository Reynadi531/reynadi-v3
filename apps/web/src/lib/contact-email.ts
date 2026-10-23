/**
 * The address is never written out in the source, markup or bundle, and never shown on the page:
 * it ships XOR-masked and in pieces, and is only decoded at the moment it is handed to the
 * clipboard or a mail client.
 */
const pieces = ["ClIoK18", "TGBsNEB", "EZMgRA"];
const key = "x7Qk-vault";

function decode() {
  const masked = atob(pieces.join(""));
  return Array.from(masked, (char, i) =>
    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length)),
  ).join("");
}

/** Decodes on demand, when the address is handed to the clipboard or a mail client. */
export const readContactEmail = decode;
