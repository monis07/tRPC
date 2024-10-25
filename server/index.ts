import { router, publicProcedure } from './trpc';
import {z} from 'zod'
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
    title : z.string(),
    description : z.string()
})
 
const appRouter = router({
    createTodo :publicProcedure
    .input(todoInputType)
    .mutation(async(opts)=>
    {
        const title = opts.input.title
        const description = opts.input.description

        return {
            id: "1",
            title : title,
            description : description
        }
    }),
    signUp : publicProcedure
    .input(z.object({
        username : z.string(),
        password : z.string()
    }))
    .mutation(async(opts)=>{
        let username = opts.input.username
        let password = opts.input.password

        //validation if user exists or not
        let token = "token"
        return {
            username : username,
            password : password,
            token : token
        }
    })
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    createContext(opts){
        let header = opts.req.headers["authorization"]
        console.log("from create context")
        return {
            user : "haha "+ header
        }
    }  });
   
server.listen(3000);