export function ehArquivoPdf(url) {
  return typeof url === 'string' && url.toLowerCase().endsWith('.pdf');
}