export interface Resource {
  id?: number; // Optional in case we're importing a resource from a template
  apiVersion: string;
  kind: string;
  metadata: any;
  spec?: any;
}
