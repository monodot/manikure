import { deploymentSchema } from './deployment';
import { serviceSchema } from './service';
import { ingressSchema } from './ingress';

export const schemas = {
  Deployment: deploymentSchema,
  Service: serviceSchema,
  Ingress: ingressSchema,
} as const;

export type ResourceType = keyof typeof schemas;
