import { Context as ContextTelegraf } from 'telegraf';
import { TodoType } from '../app/app.button';
export interface Context extends ContextTelegraf {
  session: {
    type?: TodoType;
  };
}
