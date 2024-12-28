import * as z from "zod";

export const ingressSchema = z.object({
  metadata: z.object({
    name: z.string().describe("Name"),
  }),
  spec: z.object({
    rules: z.array(
      z.object({
        host: z.string().optional(),
        http: z.object({
          paths: z.array(
            z.object({
              path: z.string(),
              pathType: z.enum(["Exact", "Prefix", "ImplementationSpecific"]),
              backend: z.object({
                service: z.object({
                  name: z.string(),
                  port: z.object({
                    number: z.number(),
                  }),
                }),
              }),
            })
          ),
        }),
      })
    ),
  }),
});
