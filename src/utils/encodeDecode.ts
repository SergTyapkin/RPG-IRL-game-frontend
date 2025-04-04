import pako from 'pako';


// === Конфигурация ===
const COMPRESSION_LEVEL = 9; // Оптимальный баланс скорости/сжатия

// === Base45 Implementation ===
const BASE45_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function toBase45(buffer: Uint8Array): string {
  let result = '';
  for (let i = 0; i < buffer.length; i += 2) {
    // Берем два байта
    const byte1 = buffer[i];
    const byte2 = buffer[i + 1];
    const value = (i + 1 < buffer.length) ? byte1 * 256 + byte2 : byte1;

    // Кодируем в 3 символа (или 2 для последнего неполного байта)
    const digitCount = (i + 1 < buffer.length) ? 3 : 2;
    let remaining = value;
    for (let j = 0; j < digitCount; j++) {
      const digit = remaining % BASE45_CHARSET.length;
      result += BASE45_CHARSET[digit];
      remaining = Math.floor(remaining / BASE45_CHARSET.length);
    }
  }
  return result;
}

function fromBase45(encoded: string): Uint8Array {
  const result: number[] = [];
  let buffer = 0;
  let bufferSize = 0;
  const reversed = encoded.split('').reverse();
  const isEndingIn2symbols = encoded.length % 3 === 2;

  let isFirstIteration = true;
  for (const char of reversed) {
    const index = BASE45_CHARSET.indexOf(char);
    if (index === -1) throw new Error(`Invalid Base45 character: ${char}`);

    buffer = buffer * BASE45_CHARSET.length + index;
    bufferSize += 1;

    // Когда накопили достаточно для извлечения байтов
    if (isEndingIn2symbols && isFirstIteration && bufferSize === 2) {
      result.push(buffer);
      buffer = 0;
      bufferSize = 0;
      isFirstIteration = false;
    } else if (bufferSize === 3) {
      result.push(buffer % 256);
      result.push(Math.floor(buffer / 256));
      buffer = 0;
      bufferSize = 0;
      isFirstIteration = false;
    }
  }

  // Обработка остатка
  if (bufferSize !== 0) {
    throw new Error('Invalid Base45 string length');
  }

  const reversedResult = result.reverse();
  return new Uint8Array(reversedResult);
}

// === Сжатие/распаковка ===
async function compressData(data: Uint8Array): Promise<Uint8Array> {
  try {
    // const cs = new CompressionStream('deflate');
    // const writer = cs.writable.getWriter();
    // writer.write(data);
    // writer.close();

    // const response = new Response(cs.readable);
    // return new Uint8Array(await response.arrayBuffer());
    return pako.deflate(data, {level: COMPRESSION_LEVEL});
  } catch (error) {
    throw new Error(`Compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function decompressData(compressed: Uint8Array): Promise<Uint8Array> {
  try {
    // const ds = new DecompressionStream('deflate');
    // const writer = ds.writable.getWriter();
    // writer.write(compressed);
    // writer.close();
    //
    // const response = new Response(ds.readable);
    // return new Uint8Array(await response.arrayBuffer());

    return pako.inflate(compressed);
  } catch (error) {
    throw new Error(`Decompression failed: ${error instanceof Error ? error.message : 'Invalid compressed data'}`);
  }
}

// === Основной API ===
export async function myEncoding(data: string): Promise<string> {
  if (typeof data !== 'string') {
    throw new Error('Input must be a string');
  }

  try {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(data);
    const compressed = await compressData(encoded);
    const isCompressed = true; //compressed.length < encoded.length;
    const optimized = isCompressed ? compressed : encoded;

    // Добавляем флаг сжатия в начало данных
    const flag = new Uint8Array([isCompressed ? 1 : 0]);
    const result = new Uint8Array(flag.length + optimized.length);
    result.set(flag);
    result.set(optimized, flag.length);

    return toBase45(result);
  } catch (error) {
    throw new Error(`Encoding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function myDecoding(encoded: string): Promise<string | null> {
  if (typeof encoded !== 'string') {
    throw new Error('Input must be a string');
  }
  if (encoded.length === 0) return '';

  try {
    const buffer = fromBase45(encoded);
    if (buffer.length === 0) return '';

    // Извлекаем флаг сжатия
    const wasCompressed = buffer[0] === 1;
    const data = buffer.slice(1);

    const decompressed = wasCompressed ? await decompressData(data) : data;
    return new TextDecoder().decode(decompressed);
  } catch (error) {
    console.error(`Decoding failed: ${error instanceof Error ? error.message : 'Invalid data'}`);
    return null;
  }
}
