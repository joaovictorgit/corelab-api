import { prisma } from "../services/prisma";

export async function checkIfItemExist(id: number): Promise<Boolean> {
  const item = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
  
  return !!item;
}