import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export async function GetAllChannels(req: Request, res: Response, prisma: PrismaClient) {
  let channels = await prisma.channel.findMany()
  res.json({channels: channels, status: "ok"})
}