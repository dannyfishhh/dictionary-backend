import { Router } from "express";
import { getPopularWords } from "../controllers/popularWords.controller.js";
import rateLimit from "express-rate-limit";

const router = Router();

// limit each IP to 1 requests per 5 minutes

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 1,
    message: "Too many requests from this IP, please try again after 5 minutes"
})

router.get("/", limiter, getPopularWords);

export default router;