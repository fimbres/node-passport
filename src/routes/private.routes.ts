import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/private', passport.authenticate('jwt', { session: false }), (request, response) => {
    response.json({msg: 'Access Authorized!'});
});

export default router;
