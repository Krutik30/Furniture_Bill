import Dexie from 'dexie';

export class LocalDbDexieClass extends Dexie {

  constructor() {
    super('smartbrand');
    this.version(1).stores({});
  }
}

export const LocalDB = new LocalDbDexieClass();