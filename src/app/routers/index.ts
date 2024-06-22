import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ServiceRoutes } from "../modules/service/service.route";
import { SlotRoutes, SlotRoutes2 } from "../modules/slot/slot.route";
const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/services",
    route: SlotRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes2,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
