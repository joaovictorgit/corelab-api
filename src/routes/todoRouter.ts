import { NextFunction, Request, Response } from "express";
import express from 'express';
import TodoController from '../controllers/todoController';

const todoController = new TodoController();
const todoRoute = express.Router();

todoRoute.post('/', (req: Request, res: Response, next: NextFunction) => {
  return todoController.createItemList(req, res);
});

todoRoute.get('/', (req: Request, res: Response, next: NextFunction) => {
  return todoController.showTodoList(req, res);
});

todoRoute.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  return todoController.showItemById(req, res);
});

todoRoute.get('/search/:title', (req: Request, res: Response, next: NextFunction) => {
  return todoController.searchByTitle(req, res);
});

todoRoute.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  return todoController.updateItem(req, res);
});

todoRoute.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  return todoController.deleteItem(req, res);
});

export default todoRoute;