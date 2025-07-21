import { z } from "zod";
import { createTRPCRouter, publicProcedure} from "../trpc";

const linkSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  requireslogin: z.boolean(),
})

const deleteLinkSchema = z.object({
  id: z.string(),
})

export const getLinksRouter = createTRPCRouter({
  getOfflineUserLinks: publicProcedure
    .query(async ({ ctx}) => {
      const links = await ctx.db.generatedLinks.findMany({
        where:{
          requireslogin: false,
        },
      });

      return links;
    }),
  getOnlineUserLinks: publicProcedure
    .query(async ({ctx}) => {
      const links = await ctx.db.generatedLinks.findMany({
        where:{
          requireslogin: true,
        },
      });

      return links;
    }),
  getAllLinks: publicProcedure
    .query(async ({ctx}) => {
      const links = await ctx.db.generatedLinks.findMany();
      return links;
    }),
  addLink: publicProcedure
    .input(linkSchema)
    .mutation(async ({ctx, input}) => {
      const action = await ctx.db.generatedLinks.create({
        data: {
          name: input.name,
          url: input.url,
          requireslogin: input.requireslogin,
        }
      })

      if(!action) {
        console.log("failed to create link");
      }

      return true;
    }),
  deleteLink: publicProcedure
    .input(deleteLinkSchema)
    .mutation(async ({ctx, input}) => {
      const action = await ctx.db.generatedLinks.delete({
        where:{
          id: input.id,
        }
      })

      if (!action) {
        console.log("failed to delete link");
      }

      return true;
    })
})