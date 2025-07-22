import { z } from "zod";
import { createTRPCRouter, publicProcedure} from "../trpc";
import bcrypt from "bcryptjs";


const signupSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signupRouter = createTRPCRouter({
    register: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {

        const existingUser = await ctx.db.user.findUnique({
            where: { email: input.email },
        });

        if(existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const result = await ctx.db.user.create({
            data: {
                username: input.username,
                email: input.email,
                password: hashedPassword,
            }
        });

        if(!result) {
            throw new Error("Failed to create user");
        }

        return { 
            message: "User registered successfully", 
            success: true,
        };
    }),
  getUsers:publicProcedure
    .query(async ({ctx}) => {
      return ctx.db.user.findMany();
    }),

  deleteUser:publicProcedure
    .input(signupSchema)
    .mutation(async ({ctx, input}) => {
      return ctx.db.user.delete({
        where: {
          id: input.id,
        }
      })
    }),

  updateUser:publicProcedure
    .input(signupSchema)
    .mutation(async ({ctx, input}) => {
      const {id, ...data} = input;
      return ctx.db.user.update({
        where: { id },
        data,
      })
    })
})