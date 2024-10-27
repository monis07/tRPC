import { initTRPC } from '@trpc/server';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */

interface Context  {
    authorization : string
}
const t = initTRPC.context<Context>().create();
 
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;