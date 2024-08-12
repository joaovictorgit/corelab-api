export type Todo = {
  id: number,
  title: string | null,
  content?: string | null,
  color: string,
  isFavorite: boolean,
  createdAt: Date,
  updatedAt: Date,
}