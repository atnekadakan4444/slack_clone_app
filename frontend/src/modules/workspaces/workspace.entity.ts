export class Workspace {
  id: number;
  name: string;
  constructor(data: Workspace) {
    Object.assign(this, data);
  }
}
