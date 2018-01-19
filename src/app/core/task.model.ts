export class Task {
  name?: string;
  fields: {
    title: {
      stringValue: string;
    }
    description: {
      stringValue: string;
    }
  };
  updating: boolean;
  createTime?: Date;
  updateTime?: Date;

  constructor(title: string, description: string, name?: string, updating?: boolean) {
    this.fields = {title: {stringValue: title}, description: {stringValue: description}};
    this.name = name;
    this.updating = updating;
  }
  getId() {
    return this.name.split('/').slice(-1)[0];
  }
}
