import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { text } from "stream/consumers";

export async function CreateNewMessage(req: Request, res: Response, prisma: PrismaClient) {
  let errors = guard_create_new_parameters(req, res, prisma)
  if (errors.length > 0) {
    res.json({status: "error", errors})
  } else {
    let message = await prisma.message.create({
      data: {
        content: req.body.text,
        senderId: 1,
        channelId: req.body.channelId
      }
    })
    res.json({message: message, status: "ok"})
  }
}

export async function GetAllMessages(req: Request, res: Response, prisma: PrismaClient) {
  if (!guard_get_all_parameters(req, res, prisma)) {
    let messages = await prisma.message.findMany({
      where: {
        channelId: Number(req.query.channelId)
      }
    })
    res.json({messages: messages, status: "ok"})
  }
}

function guard_create_new_parameters(req: Request, res: Response, prisma: PrismaClient): Array<string> {
  var errors = []
  if (req.body.channelId == undefined) {
    errors.push("channelId_empty")
  } else if (req.body.text == undefined || req.body.text == "") {
    errors.push("text_empty")
  }
  return errors
}

function guard_get_all_parameters(req: Request, res: Response, prisma: PrismaClient) {
  if (req.query.channelId == undefined) {
    res.json({status: "error", errors: ["channelId_empty"]})
    return true
  } else {
    return false
  }
}