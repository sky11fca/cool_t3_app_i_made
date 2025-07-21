import { z } from "zod";
import { createTRPCRouter, publicProcedure} from "../trpc";

const addLinkSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  requireslogin: z.boolean(),
})

const deleteLinkSchema = z.object({
  id: z.string(),
})

const updateLinkSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  url: z.string().url(),
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
    .input(addLinkSchema)
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
    }),
  updateLink: publicProcedure
    .input(updateLinkSchema)
    .mutation(async ({ctx, input}) => {
      console.log(input);
      const action = await ctx.db.generatedLinks.update({


        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          url: input.url,
          requireslogin: input.requireslogin,
        }
      })

      if(!action) {
        console.log("failed to update link");
      }

      return true;
    })
})