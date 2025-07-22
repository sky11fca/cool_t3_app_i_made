import { z } from "zod";
import { createTRPCRouter, publicProcedure} from "../trpc";

const linkSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Invalid URL"),
  requireslogin: z.boolean(),
})

export const getLinksRouter = createTRPCRouter({
  getOfflineUserLinks: publicProcedure
    .query(async ({ ctx}) => {
      return ctx.db.generatedLinks.findMany({
        where: {
          requireslogin: false,
        },
      });
    }),
  getOnlineUserLinks: publicProcedure
    .query(async ({ctx}) => {
      return ctx.db.generatedLinks.findMany({
        where: {
          requireslogin: true,
        },
      })
    }),
  getAllLinks: publicProcedure
    .query(async ({ctx}) => {
      return ctx.db.generatedLinks.findMany();
    }),
  addLink: publicProcedure
    .input(linkSchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.db.generatedLinks.create({
        data: input
      });
    }),
  deleteLink: publicProcedure
    .input(linkSchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.db.generatedLinks.delete({
        where:{
          id: input.id,
        }
      })
    }),
  updateLink: publicProcedure
    .input(linkSchema)
    .mutation(async ({ctx, input}) => {
      const {id, ...data} = input;

      return await ctx.db.generatedLinks.update({
        where: { id },
        data,
      });
    })
})