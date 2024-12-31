export interface Resource {
  id: number;
  apiVersion: string;
  kind: string;
  metadata: any;
  spec?: any;
}
