export function requireFields(body, fields = []) {
  const missing = fields.filter((f) => !body?.[f]);

  if (missing.length > 0) {
    throw new Error(`Missing fields: ${missing.join(", ")}`);
  }
}
