import { deploymentSchema, deploymentFieldConfig } from './deployment';
import { serviceSchema } from './service';
import {ingressFieldConfig, ingressSchema} from './ingress';
import {z} from "zod";

export const schemas = {
  Deployment: deploymentSchema,
  Service: serviceSchema,
  Ingress: ingressSchema,
  default: z.object({}).describe("Unknown Resource Type"), // TODO: Flesh this out
} as const;

export const configs = {
  Deployment: deploymentFieldConfig,
  Service: {},
  Ingress: ingressFieldConfig,
  default: {}
} as const;

export type ResourceType = keyof typeof schemas;
