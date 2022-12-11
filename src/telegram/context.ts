import type { ParseModeFlavor } from 'https://deno.land/x/grammy_parse_mode@1.5.0/hydrate.ts';
import type { PrismaClient, User } from '@prisma/client';
import type {
	Context,
	Conversation,
	ConversationFlavor,
	SessionFlavor,
} from './deps.ts';

export interface GrammySession {
	id?: string;
}

export type GrammyContext =
	& {
		db: PrismaClient;
		user?: User;
	}
	& SessionFlavor<GrammySession>
	& ConversationFlavor
	& ParseModeFlavor<Context>;

export type GrammyConversation = Conversation<GrammyContext>;
