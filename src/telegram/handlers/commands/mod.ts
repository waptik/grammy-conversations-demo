import { Composer } from 'grammy';

import { GrammyContext } from '~grammy/context.ts';

import start from './start.ts';
import help from './help.ts';
import tasks from './tasks/mod.ts';
import setup from './setup.ts';
import drop from './drop.ts';

const composer = new Composer<GrammyContext>();

composer.use(start, help, drop, setup, tasks);

export default composer;
