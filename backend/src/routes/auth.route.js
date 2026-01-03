import express from 'express';

import {signup} from "../controllers/auth.controller.js";
import {login} from "../controllers/auth.controller.js";
import {logout} from "../controllers/auth.controller.js";
import {updateProfile} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);

router.post("/logout",logout);

router.put("/update-profile",protectRoute,updateProfile);

export default router;      