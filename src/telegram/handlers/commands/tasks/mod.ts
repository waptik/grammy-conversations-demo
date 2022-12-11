import { Composer } from 'grammy';

import add from './add.ts';
import { GrammyContext } from '~grammy/context.ts';

const tasksComposer = new Composer<GrammyContext>();

tasksComposer.use(add);

export default tasksComposer;
