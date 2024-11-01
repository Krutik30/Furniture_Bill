import { agentType, customerType, designType, transportType } from "sb-schema-and-types";
import { LocalDB } from "../db/localdb";
import { customFetch } from "./customFetch";


export const localCacheTableOptions = ['agent', 'customer', 'design', 'transport'] as const

const checkCacheIsLatest = (tableType: typeof localCacheTableOptions[number]) => {
  const localDBCount = LocalDB[tableType].count();
  const localMaxUpdatedAt = LocalDB[tableType]
    .orderBy('updatedAt').last();
  // console.log(getRandomIntInclusive(500, 2000));
  // FIXME: Update api-endpoint
 const remoteDataState =  customFetch(`/v1/getList/${tableType}`, {
    method: 'POST',
    body: JSON.stringify({
      query: {
        _count: true,
        _max: {
          updatedAt: true,
        },
      },
      queryType: 'aggregate',
    })
  })
    .then((response: any) => {
      if (response?.status === 'success') {
        return {
          count: response?.payload?._count,
          maxUpdatedAt: response?.payload?._max?.updatedAt,
        };
      } else {
        throw new Error('Failed to fetch remote data');
      }
    })
    .catch((error) => {
      throw error; // Rethrow the error to be caught by the outer catch block
    })
  // console.log(tableType)


  return Promise.all([localDBCount, localMaxUpdatedAt, remoteDataState])
    .then(values => (values[0]===values[2].count && values[1]?.updatedAt===values[2].maxUpdatedAt))
};

type responseTypes<T> = T extends 'agent'
  ? agentType[]
  :T extends 'design' 
    ? designType[] 
    : T extends 'customer' 
      ? customerType[] 
      : T extends 'transport'
        ? transportType[]
        : never;
export const updateLocalCache = <T extends typeof localCacheTableOptions[number]>(tableType: T) => {

  const queryBody = tableType === 'design' ? {query: { include: {sku_details: true}}} : {query: {}};
  return customFetch(`/v1/getList/${tableType}`, {
    method: 'POST',
    body: JSON.stringify(queryBody)
  }).then((latestCacheObj) => {
    // console.log({tableType, queryBody, latestCacheObj});
    if(latestCacheObj.status=="success"){
      LocalDB[tableType].clear();
      // eslint-disable-next-line 
      // @ts-ignore
      LocalDB[tableType].bulkAdd(latestCacheObj.payload);
    }
    return true;
  })
};

export const checkAndUpdateLocalCache =(tableTypes: typeof localCacheTableOptions[number] | typeof localCacheTableOptions[number][]) => {
  tableTypes = typeof tableTypes==='string' ? [tableTypes] : tableTypes;
  
  return Promise.all(tableTypes.map((
    // check if the localcache state is latest.
    tableType => checkCacheIsLatest(tableType)
      // return true if localcache is latest or return true after updating localcache state.
      .then(isLatest => isLatest ? isLatest : updateLocalCache(tableType)
  ))));
};