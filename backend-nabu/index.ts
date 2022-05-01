import express, { Express, Request, Response } from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client'
import { GetAllMessages, CreateNewMessage }  from "./controllers/MessagesController"
import { GetAllChannels } from "./controllers/ChannelsController"

const prisma = new PrismaClient()

const PORT = 3001
const app = express()
app.use(cors())
app.use(express.json())



app.get("/messages", (req: Request, res: Response) => {
  GetAllMessages(req, res, prisma)
})

app.post("/message/new", (req: Request, res: Response) => {
  CreateNewMessage(req, res, prisma)
})

app.get("/channels", (req: Request, res: Response) => {
  GetAllChannels(req, res, prisma)
})

// hacky way to clear test_db between tests. Probably would need docker to run tests in real isolation
app.get("/dangerous/only_in_dev/clear_database", (req: Request, res: Response) => {
  prisma.message.deleteMany({}).then(() => {
    res.json({status: "ok"})
  })
})

app.listen(PORT, async () => {
  createSeedUser("qnsi")
  createSeedChannel("main")
  createSeedChannel("random")
  console.log(`Server listening on ${PORT}`)
})

async function createSeedUser(username: string) {
  let user = await prisma.user.findFirst({
    where: {
      username
    }
  })
  if (user === null) {
    let user = await prisma.user.create({
      data: {
        username
      }
    })
  }
}

async function createSeedChannel(name: string) {
  let channel = await prisma.channel.findFirst({
    where: {
      name
    }
  })

  if (channel === null) {
    await prisma.channel.create({
      data: {
        name
      }
    })
  }
}