// import { customFetch } from "./customFetch"
// import { distinctSizesCache } from "./localCacheAPI"

// // This set time out to check the loading window is working.
// // export const updateSizesInLocalCache = () => new Promise((resolve) => setTimeout(() => {
// //   resolve(
// //     customFetch(
// //       '/v1/utils/getDistinctSizes'
// //     ).then(
// //       (sizes) => distinctSizesCache.createOrUpdate(sizes.payload)
// //     )
// //   )
// // }, 2000));

// export const updateSizesInLocalCache = () => customFetch(
//       '/v1/utils/getDistinctSizes'
//     ).then(
//       (sizes) => distinctSizesCache.createOrUpdate(sizes.payload)
//     )