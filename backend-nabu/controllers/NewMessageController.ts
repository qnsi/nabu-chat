import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { text } from "stream/consumers";

export default async function NewMessageController(req: Request, res: Response, prisma: PrismaClient) {
  //{ id: 0, sender: 'Qnsi', text: 'sdf', status: 'waiting' }
  let user = await prisma.message.create({
    data: {
      content: req.body.text,
      senderId: 1
    }
  })
  res.json({user: user})
}