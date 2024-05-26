import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@gopi_0104/medium-common/dist'




export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }

}>()



blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select:{
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true
        }
      }
    }
  })  
  

  return c.json({
    blogs
  })
})



blogRouter.use('/*', async(c, next) => {    
  const jwt = c.req.header('authorization')  || ""
    if(!jwt){
      c.status(401)
      c.json({
        error: "unauthorized"
      })
    }

    try{
      const token = jwt.split(' ')[1]
      const payload = await verify(token, c.env.JWT_SECRET)
      if(!payload){
        c.status(401)
        c.json({
          error: "You are not logged-in"
        })
      }  
    c.set('userId', payload.user);
    await next()

    }catch(e){
      c.status(403)
      c.json({
        error: "You are not logged-in"
      })
    }

})


blogRouter.post('/', async (c) => {  

  const body = await c.req.json()

  const {success} = createBlogInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
      error: "Invalid inputs"
    })
  }
  

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());
  
  const {title,  content} = body

  const authorId = c.get('userId') 
  
  const blog = await prisma.post.create({
    data: {
      title,
      content,      
      authorId
    }
  })
  

  c.status(200)
  return c.json({
    id: blog.id
  })
})


blogRouter.put('/', async (c) => {

  const body = await c.req.json()

  const {success} = updateBlogInput.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
      error: "Invalid Input"
    })
  }

  

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  const {title,  content, id} = body

  
  const blog = await prisma.post.update({
    where: {
      id
    },
    data: {
      title,
      content, 
      
    }
  })
  

  c.status(200)
  return c.json({
    id: blog.id
  })

})



blogRouter.get('/:id', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
  }).$extends(withAccelerate());

  const id = await c.req.param('id')

  
  try{
    const blog = await prisma.post.findFirst({
      where: {
        id
      },
      select:{
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })

    return c.json({
      blog
    })
  }catch(e){
    c.status(411)
    c.json({
      message: "Error while fetching the blog post"
    })
  }
})




export default blogRouter

