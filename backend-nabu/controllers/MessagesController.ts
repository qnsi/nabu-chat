import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { text } from "stream/consumers";

export async function CreateNewMessage(req: Request, res: Response, prisma: PrismaClient) {
  //{ id: 0, sender: 'Qnsi', text: 'sdf', status: 'waiting' }
  let message = await prisma.message.create({
    data: {
      content: req.body.text,
      senderId: 1
    }
  })
  res.json({message: message})
}

export async function GetAllMessages(req: Request, res: Response, prisma: PrismaClient) {
  let messages = await prisma.message.findMany()
  res.json({messages: messages, status: "ok"})
}