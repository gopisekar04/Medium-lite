import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'
import {signinInput, signupInput} from '@gopi_0104/medium-common/dist'



export const userRouter
 = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
    Variables: {
      userId: string
    }
  
  }>()

userRouter.post('/signup', async(c) => {
  
  const body = await c.req.json()

  const {success} = signupInput.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
      error: "Invalid Input"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const {name, email, password} = body
  

  try{
    const newUser = await prisma.user.create({
      data:{
        email,
        name,
        password
      }      
    })


    const secret = c.env.JWT_SECRET
    const payload = {
      id: newUser.id
    }    
    
    const jwt = await sign(payload,secret);
    setCookie(c, "jwt", jwt)
    return c.json({ jwt });

  }catch(e){            
    return c.json({      
      error: "error while signing up"
    })
  }

  
})

userRouter
.post('/signin', async(c) => {

  const body = await c.req.json()

  const {success} = signinInput.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
      error: "Invalid login credentials"
    })
  }

  const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    
  try {    
    const body = await c.req.json()
    const{ email, password } = body

    const user = await prisma.user.findUnique({
      where: {
        email,
        password
      }
    })

    if(!user){
      return c.json({
        error: "User not found"
      })
    }

    const jwt = await sign({user: user.id}, c.env.JWT_SECRET)
    setCookie(c, "jwt", jwt)
    return c.json({
      jwt 
    })

  }catch{
    return c.json({
      error: "error while signing in"
    })
  }

})