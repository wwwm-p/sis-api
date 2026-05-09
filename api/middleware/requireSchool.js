export function requireSchool(req) {
  const schoolId =
    req.headers["x-school-id"] ||
    req.query.schoolId ||
    req.body?.schoolId;

  if (!schoolId) {
    return {
      error: "Missing school context (schoolId required)",
    };
  }

  req.schoolId = schoolId;
  return schoolId;
}
