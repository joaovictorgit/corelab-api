import { Request, Response } from "express";
import { prisma } from '../services/prisma';
import { Todo } from "../types/todo";
import { checkIfItemExist } from "../utils/todo";

class TodoController {
  async createItemList(req: Request, res: Response): Promise<Response> {
    try {
      const { title, content, isFavorite } = req.body;
      const item: Todo = await prisma.todo.create({
        data: {
          title,
          content,
          isFavorite,
        }
      });

      return res.status(201).json({
        message: 'Item list created!',
        result: item,
      });
    } 
    catch (error: unknown) {
      return res.status(400).json({
        message: "Error creating user!",
        error: error,
      });
    }
  }

  async showTodoList(req: Request, res: Response): Promise<Response> {
    try {
      const items: Todo[] = await prisma.todo.findMany();
      
      return res.status(200).json(items);
    } 
    catch (error: unknown) {
      return res.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async showItemById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const isItemExist = await checkIfItemExist(id);

      if (!isItemExist) {
        return res.status(404).json('item.not.found');
      }
      const item = await prisma.todo.findUnique({
        where: { id: id },
      });
      return res.status(200).json(item);
    } 
    catch (error: unknown) {
      return res.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async searchByTitle(req: Request, res: Response): Promise<Response> {
    try {
      const title = req.params.title;
      const items: Todo[] = await prisma.todo.findMany({
        where: { title },
      });
      return res.status(200).json(items);
    } 
    catch (error: unknown) {
      return res.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async updateItem(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const item = req.body;

      const isItemExist = await checkIfItemExist(id);

      if (!isItemExist) {
        return res.status(404).json('item.not.found');
      }

      await prisma.todo.update({
        where: {
          id: id,
        },
        data: item,
      })

      return res.status(200).json('item.updated');
    } 
    catch (error: unknown) {
      return res.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async deleteItem(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const isItemExist = await checkIfItemExist(id);
    
      if (!isItemExist) {
        return res.status(404).json('item.not.found');
      }
      const item = await prisma.todo.delete({
        where: { id: id },
      });
      return res.status(200).json({
        message: "Item deleted",
        result: item,
      });
    } 
    catch (error: unknown) {
      return res.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }
};

export default TodoController;