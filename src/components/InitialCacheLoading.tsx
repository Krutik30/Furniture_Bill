import { useEffect } from "react";
import { checkAndUpdateLocalCache, localCacheTableOptions } from "../utils/checkCacheIsLatest";
import { Box, Typography } from "@mui/material";
import { updateSizesInLocalCache } from "../utils/updateSizesInLocalCache";
import { intialCacheLoadStatus } from "../App";

type inputProps = {
  initialCacheLoaded: intialCacheLoadStatus,
  setInitialCacheLoaded: React.Dispatch<React.SetStateAction<intialCacheLoadStatus>>
}

export const InitialCacheLoading = ({initialCacheLoaded, setInitialCacheLoaded}: inputProps) => {
  
  const updateLocalCache = (tableType: typeof localCacheTableOptions[number]) => checkAndUpdateLocalCache(tableType).then(res => {
    if(res[0]===true) setInitialCacheLoaded(initialState => ({...initialState, [tableType]: true}))
  });

  useEffect(() => {
    localCacheTableOptions.forEach((tableType: typeof localCacheTableOptions[number]) => updateLocalCache(tableType));
    // the above handles only data stored in dexie localdb.
    updateSizesInLocalCache().then(() => setInitialCacheLoaded(initialState => ({...initialState, sizes: true})))
  }, []);

  return (
    <Box>
      {localCacheTableOptions.map((tableType) => <Typography key={tableType} textTransform='capitalize'>{tableType} {initialCacheLoaded[tableType] ? 'Ready' : `Updating`}...</Typography>)}
      <Typography textTransform='capitalize'>Sizes {initialCacheLoaded['sizes'] ? 'Ready!' : 'Updating...'}</Typography>
    </Box>
  );
};

