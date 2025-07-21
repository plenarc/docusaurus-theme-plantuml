import pako from 'pako';

// Custom Base64 alphabet for PlantUML.
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

/**
 * Encodes a Uint8Array into a custom Base64 string.
 * @param data - Deflated data array.
 * @returns Encoded string.
 */
function encode64(data: Uint8Array): string {
  let result = '';
  let current = 0;
  let bits = 0;
  for (let i = 0; i < data.length; i++) {
    // Cast data[i] as number; data[i] is defined because i < data.length.
    const byte: number = data[i] as number;
    current = (current << 8) | byte;
    bits += 8;
    while (bits >= 6) {
      bits -= 6;
      const index = (current >> bits) & 0x3f;
      result += ALPHABET[index];
    }
  }
  if (bits > 0) {
    const index = (current << (6 - bits)) & 0x3f;
    result += ALPHABET[index];
  }
  return result;
}

/**
 * Compresses and encodes the given PlantUML source text.
 * @param text - PlantUML description string.
 * @returns Encoded string.
 */
export function encodePlantUML(text: string): string {
  // Compress using pako.deflateRaw (synchronous, returns Uint8Array)
  const deflated = pako.deflateRaw(text, { to: 'uint8array' });
  return encode64(deflated);
}
