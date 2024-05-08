import * as express from "express";
import { userRouter } from "./user.routes";
import { productsRouter } from "./products.routes";
import { ordersRouter } from "./order.route";
import { authRouter } from "./auth.route";
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.json({
    code: 200,
    message: 'ok',
}));

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export { router as routes }