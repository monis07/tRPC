import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers(){
        return {
            "authorization" :"token from client"
        }
      }
    }),
  ],
});

const fun = async () => {
    let response = await trpc.createTodo.mutate({
        title:"Gym",
        description : "Hit the gym"
    })

    let response1 = await trpc.signUp.mutate({
        username : "user",
        password : "password"
    })

    console.log(response)
    console.log(response1);
    
}

fun()