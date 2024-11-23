export interface FileBase extends File {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
  order?: number;
}
