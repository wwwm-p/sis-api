import { db } from "../../db/db.js";

import { requireAuth } from "../../middleware/requireAuth.js";
import { requireSchool } from "../../middleware/requireSchool.js";

import { requireFields } from "../../lib/validators.js";
import { success, error } from "../../lib/responses.js";

import { getAssignedCounselor } from "../../services/assignmentService.js";
import { createAssessment } from "../../services/assessmentService.js";

export default async function handler(req, res) {
  try {
    // METHOD CHECK
    if (req.method !== "POST") {
      return error(res, "Method not allowed", 405);
    }

    // AUTH
    const user = await requireAuth(req);

    // SCHOOL CONTEXT
    const schoolId = requireSchool(req);

    // BODY
    const {
      reason,
      urgency,
      notes,
    } = req.body;

    // VALIDATION
    requireFields(req.body, ["reason", "urgency"]);

    // FIND ASSIGNED COUNSELOR
    const counselor = await getAssignedCounselor(
      db,
      user.id,
      schoolId
    );

    if (!counselor) {
      return error(
        res,
        "No assigned counselor found",
        404
      );
    }

    // CRISIS CHECK
    const isCrisis =
      urgency === "crisis" ||
      urgency === "high";

    // CREATE ASSESSMENT
    const assessment = await createAssessment(db, {
      schoolId,
      studentId: user.id,
      counselorId: counselor.id,
      reason,
      urgency,
      notes,
      isCrisis,
    });

    // FUTURE:
    // emit crisis event
    // send notification
    // realtime push

    return success(res, assessment);

  } catch (err) {
    console.error(err);

    return error(
      res,
      err.message || "Internal server error",
      500
    );
  }
}
