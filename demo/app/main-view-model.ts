import { Observable } from 'tns-core-modules/data/observable';

export class HelloWorldModel extends Observable {
  public date: Date;

  constructor() {
    super();

    this.date = new Date(2018, 9, 1);
  }

  public callbackFn(args: any) {
    console.error('GOT IT!', args);
  }
}
