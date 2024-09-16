import { Router } from "express";
import { postReview, getReviews } from "./review.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();
router.get("/get-review", getReviews);
router.post("/post-review", auth(USER_ROLE.user), postReview);
const reviewRoutes = router;
export default reviewRoutes;
