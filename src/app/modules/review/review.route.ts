import { Router } from "express";
import { createReview, getReviews } from "./review.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();
router.get("/get-review", getReviews);
router.post("/create-review", auth(USER_ROLE.user), createReview);
const reviewRoutes = router;
export default reviewRoutes;
