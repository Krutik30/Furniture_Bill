import Dexie, { Table } from 'dexie';
import { agentType, customerType, designType, transportType } from 'sb-schema-and-types';

export const localdbStoresObj = {
  customer: '++customer_name, updatedAt', // Primary key and indexed props
  agent: '++agent_name, updatedAt',
  transport: '++transport_name, updatedAt',
  design: '++design_name, updatedAt'
};
export class LocalDbDexieClass extends Dexie {
  // We just tell the typing system this is the case
  customer!: Table<customerType>; 
  agent!: Table<agentType>;
  transport!: Table<transportType>; 
  design!: Table<designType>;

  constructor() {
    super('smartbrand');
    this.version(1).stores(localdbStoresObj);
  }
}

export const LocalDB = new LocalDbDexieClass();