import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { healthcheck } from "../controllers/healthcheck.controller.js";

const router = Router()

router.route("/healthCheck").get(jwtVerify, healthcheck)

export default router