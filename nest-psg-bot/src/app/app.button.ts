import { Markup } from 'telegraf';

export const enum TodoType {
  create = '📝 Создать задачу',
  list = '📒 Список задач',
  done = '✅ Завершить',
  edit = '✏️ Редактирование',
  delete = '🗑 Удаление',
}

export function actionButtons() {
  return Markup.keyboard([
    Markup.button.callback(TodoType.create, 'create'),
    Markup.button.callback(TodoType.list, 'list'),
    Markup.button.callback(TodoType.done, 'done'),
    Markup.button.callback(TodoType.edit, 'edit'),
    Markup.button.callback(TodoType.delete, 'delete'),
  ]);
}
