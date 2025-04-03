export async function myEncoding(text: string) {
  // 1. Сжимаем текст в deflate
  const compressedStream = new Blob([text]).stream().pipeThrough(
    // eslint-disable-next-line compat/compat
    new CompressionStream("deflate")
  );

  // 2. Преобразуем сжатые данные в Uint8Array
  const reader = compressedStream.getReader();
  const chunks: Uint8Array[] = [];
  let totalLength = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    totalLength += value.length;
  }

  const compressedData = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    compressedData.set(chunk, offset);
    offset += chunk.length;
  }

  // 3. Кодируем бинарные данные в строку БЕЗ потерь (0-255 → Unicode)
  let safeText = "";
  for (let i = 0; i < compressedData.length; i++) {
    // Каждый байт (0-255) превращаем в символ Unicode (0-FFFF)
    safeText += String.fromCharCode(compressedData[i] + 0x100); // 0x100 гарантирует, что символы не сломаются
  }

  return safeText;
}

export async function myDecoding(text: string) {
  // 1. Преобразуем строку обратно в Uint8Array
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) {
    // Возвращаем байты в исходный диапазон (0-255)
    bytes[i] = text.charCodeAt(i) - 0x100;
  }

  // 2. Распаковываем deflate
  const decompressedStream = new Blob([bytes]).stream().pipeThrough(
    // eslint-disable-next-line compat/compat
    new DecompressionStream("deflate")
  );

  // 3. Читаем распакованные данные
  const reader = decompressedStream.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }

  // 4. Финализируем декодер
  result += decoder.decode();

  return result;
}
