import { deflateRawSync } from 'zlib';
import { Buffer } from 'buffer';

// en: Custom Base64 alphabet for PlantUML
// jp: PlantUML用のカスタムBase64アルファベット
const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

/**
 * en: Function to encode buffer to custom Base64
 * jp: バッファをカスタムBase64にエンコードする関数
 * @param data en: Deflated data / jp: deflate済みのデータ
 * @returns en: Encoded string / jp: エンコード済み文字列
 */
function encode64(data) {
  let result = '';
  let current = 0;
  let bits = 0;
  for (let i = 0; i < data.length; i++) {
    current = (current << 8) | data[i];
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
 * en: Function to compress and encode PlantUML source text
 * jp: PlantUMLのソーステキストを圧縮・エンコードする関数
 * @param text en: String of PlantUML description / jp: PlantUML記述の文字列
 * @returns en: Encoded string / jp: エンコード済み文字列
 */
export function encodePlantUML(text) {
  // en: Compress with deflateRawSync without zlib header (No problem as it is Node environment at build time)
  // jp: deflateRawSyncによりzlibヘッダなしで圧縮 (build時はNode環境なので問題ありません)
  const deflated = deflateRawSync(Buffer.from(text, 'utf8'));
  return encode64(deflated);
}
