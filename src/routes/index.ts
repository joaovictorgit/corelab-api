import express from 'express';
import todoRouter from "./todoRouter";

const routers = express.Router();

routers.use('/todo', todoRouter);

export default routers;