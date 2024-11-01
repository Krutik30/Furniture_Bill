import { app_version, be_url } from "../config";
// import { authTokensCache } from "./localCacheAPI";
let controller = new AbortController();
let signal = controller.signal;

type customFetchOptionsType = Omit<RequestInit, 'body'> & {
    body?: any,
    waitTime?: number
};

const queryOptions = (options: customFetchOptionsType): RequestInit => {
  const isFormData = options.body instanceof FormData;
    const newOption =  {
        method: options?.method || 'GET',
        headers: {
          // In FormData headers are set automatically by fetch.
          ...(isFormData
              ? {}
              : {
                Accept: 'application.json',
                'Content-Type': 'application/json'
              }
          ),
          authorization: '',
          app_version: app_version,
          ...options.headers
        },
        body: (typeof options.body === "string" || isFormData)
          ? options.body 
          : JSON.stringify(options.body),
        cache: options.cache || 'no-store',
        credentials: options.credentials || "include",
        signal
    };

    // if(options.credentials !== 'omit') {
    //   const authTokens = authTokensCache.getItem();
    //   newOption.headers.authorization = `Bearer ${authTokens.access.token}`;
    // }

    return newOption;
};
// response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


// maintaining state if the refresh token is already requested
let isRefreshTokenFetching = false;

// list of failed apis waiting for refresh Token update
// let failedApiCallsProps: rerunningFailedFetchTypes[] = [];

// inspired from https://blog.devgenius.io/simplifying-401-unauthorized-error-resolution-with-a-single-refresh-token-request-in-reactjs-4422ee58c4fe
const refreshToken = () => {
  isRefreshTokenFetching = true;
  // const authTokens = authTokensCache.getItem();
  // fetch((be_url + ''), queryOptions({
  //   credentials: 'omit',
  //   body: JSON.stringify({refreshToken: authTokens.refresh.token})
  // }))
  //   .then(res => res.json())
  //   .then(newTokens => {
  //     // save new token to localStorage
  //     authTokensCache.createOrUpdate(newTokens)

  //     // refresh token fetch is reset false
  //     isRefreshTokenFetching = false;

  //     // failed Api calls are now called.
  //     const failedApisPromises = failedApiCallsProps.map(props => rerunningFailedFetch(props));
  //     Promise.allSettled(failedApisPromises).then((() => {failedApiCallsProps = []}));

  //   })
  //   .catch(err => {
  //     // delete old tokens from local storage
  //     authTokensCache.deleteItem();

  //     // refresh token fetch is reset false
  //     isRefreshTokenFetching = false;

  //     // failed Api calls need to be rejected
  //     failedApiCallsProps.map(props => props[1](err));
  //   })
};
// type rerunningFailedFetchTypes = [resolve: (value: unknown) => void , reject: (reason?: any) => void, route: RequestInfo | URL, options: customFetchOptionsType];

// const rerunningFailedFetch = ([resolve, reject, route, options]: rerunningFailedFetchTypes) => customFetch(route, options)
//   .then((res) => resolve(res))
//   .catch((err) => reject(err))

// export const customFetch = (route: RequestInfo | URL, options: customFetchOptionsType = {}):Promise<any> => {
  
//   // using a new promise so that the promise is pending if failed api waiting for token to be refreshed.
//   return new Promise((resolve, reject) => {
//     if (isRefreshTokenFetching && options.credentials !== 'omit') {
//       failedApiCallsProps.push([resolve, reject, route, options]);
//       return;
//     }
//     // console.log({route, options});
//     // Cancel the fetch request in 20000ms;
//     // https://javascript.info/fetch-abort;
//     const abortTimeout = setTimeout(() => controller.abort(), (options.waitTime || 20000));

    
//     const routeWithBeUrl = (route.toString().substring(0, 4) !== 'http') 
//       ? be_url + route
//       : route;
//     console.log(routeWithBeUrl,options)
//     fetch(
//       routeWithBeUrl, queryOptions(options)
//     )
//     .then(async res => {
//         // console.log({res});
//         clearTimeout(abortTimeout);
//         const response = (res.status === 204) ? res : await res.json();
//         if (response.status >= 400) reject(response);
//         if(res.status!== 200 && res.status!==204) reject(response)
//         resolve(response);
//     })
//     .catch(async (err) => {
//         console.error({route, err});
//         clearTimeout(abortTimeout);
//         if (err.name == 'AbortError') { // handle abort()
//             controller = new AbortController();
//             signal = controller.signal;
//             console.log("Aborted!");
//             reject(new Error("Server taking too long to respond. Please try again."));
//         }
//         else if (err.status === 401 && err.message !== 'Incorrect Phone Number or password') {
//           failedApiCallsProps.push([resolve, reject, route, options]);
//           refreshToken();
//         }
//         else {
//           console.error(err);
//           if(err.message) err = await err.json();
//           reject(err);
//         }
//     })
//   });
// }

export const customFetchOld = async (route: RequestInfo | URL, options: customFetchOptionsType = {}) => {
    // console.log({route, options});
    // Cancel the fetch request in 20000ms;
    // https://javascript.info/fetch-abort;
    const abortTimeout = setTimeout(() => controller.abort(), (options.waitTime || 20000));

    if (route.toString().substring(0, 4) !== 'http')
        route = be_url + route;

    return await fetch(
        route, queryOptions(options)
    )
    .then(async res => {
        clearTimeout(abortTimeout);

        if(!res || !res.ok || res.status >= 400) throw res;

        const response = await res.json();

        return response;
    })
    .catch(async (err) => {
        console.error({route, err});
        clearTimeout(abortTimeout);
        if (err.name == 'AbortError') { // handle abort()
            controller = new AbortController();
            signal = controller.signal;
             console.log("Aborted!");
             throw new Error("Server taking too long to respond. Please try again.");
        }
        else {
          err = await err.json();
          console.error(err);
        }
        throw err;
    })
}

