import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';
import postRouter from './post.route';
import commentRouter from './comment.route';

const indexRouter = Router();

indexRouter.use('/auth', authRouter );
indexRouter.use('/user', userRouter );
indexRouter.use('/post', postRouter);
indexRouter.use('/', commentRouter);

export default indexRouter;