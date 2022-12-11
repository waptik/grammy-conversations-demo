import { GrammyContext } from '~grammy/context.ts';
import { Composer } from '~grammy/deps.ts';
import addTaskConversation from './add-task.conversation.ts';
import setupBotConversation from './setup-bot.conversation.ts';

const conversationComposer = new Composer<GrammyContext>();

conversationComposer.use(addTaskConversation);
conversationComposer.use(setupBotConversation);

export default conversationComposer;
