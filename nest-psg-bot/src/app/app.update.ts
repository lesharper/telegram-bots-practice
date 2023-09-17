import { AppService } from './app.service';
import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButtons, TodoType } from './app.button';
import { Context } from '../types/context.interface';
import { showList } from './app.utils';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Добро пожаловать :)');
    await ctx.reply('Что ты хочешь сделать?', actionButtons());
  }

  @Hears(TodoType.create)
  async createTask(ctx: Context) {
    ctx.session.type = TodoType.create;
    await ctx.reply('Опиши задачу: ');
  }

  @Hears(TodoType.list)
  async listTask(ctx: Context) {
    const todos = await this.appService.getAll();
    await ctx.reply(showList(todos));
  }

  @Hears(TodoType.done)
  async doneTask(ctx: Context) {
    ctx.session.type = TodoType.done;
    await ctx.reply('Напишите ID задачи:');
  }

  @Hears(TodoType.edit)
  async editTask(ctx: Context) {
    ctx.session.type = TodoType.edit;
    await ctx.deleteMessage();
    await ctx.replyWithHTML(
      'Напишите ID и новое название задачи: \n\n' +
        'В формате - <b>1 | Новое название</b>',
    );
  }

  @Hears(TodoType.delete)
  async deleteTask(ctx: Context) {
    ctx.session.type = TodoType.delete;
    await ctx.deleteMessage();
    await ctx.reply('Напиши ID задачи:');
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === TodoType.create) {
      const todos = await this.appService.createTask(message);

      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === TodoType.done) {
      const todos = await this.appService.doneTask(Number(message));

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply('Задачи с таким ID не найдено');
        return;
      }
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === TodoType.edit) {
      const [taskId, taskName] = message.split('|');
      const todos = await this.appService.editTask(Number(taskId), taskName);

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply('Задачи с таким ID не найдено');
        return;
      }
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === TodoType.delete) {
      const todos = await this.appService.deleteTask(Number(message));

      if (!todos) {
        await ctx.deleteMessage();
        await ctx.reply('Задачи с таким ID не найдено');
        return;
      }

      await ctx.reply(showList(todos));
    }
  }
}
