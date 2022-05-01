import express, { Express, Request, Response } from "express"
import cors from "cors"
import { PrismaClient } from '@prisma/client'
import { GetAllMessages, CreateNewMessage }  from "./controllers/MessagesController"

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

app.get("/message/new", (req: Request, res: Response) => {
  console.log("Got GET message request")
  res.json({status: "ok"})
})

// hacky way to clear test_db between tests. Probably would need docker to run tests in real isolation
app.get("/dangerous/only_in_dev/clear_database", (req: Request, res: Response) => {
  prisma.message.deleteMany({}).then(() => {
    res.json({status: "ok"})
  })
})

app.listen(PORT, () => {
  let mockUser = prisma.user.create({
    data: {
      username: "qnsi"
    }
  }).then(() => {
    console.log(`Server listening on ${PORT}`)
  })
})