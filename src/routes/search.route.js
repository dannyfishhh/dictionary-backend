import { Router } from "express";
import { searchWord } from "../controllers/search.controller.js";

const router = Router();

router.post("/", searchWord);

export default router;