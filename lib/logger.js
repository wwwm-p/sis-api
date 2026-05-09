export function log(message, data) {
  console.log(`[SIS-API] ${message}`, data || "");
}

export function errorLog(message, error) {
  console.error(`[SIS-API ERROR] ${message}`, error);
}
