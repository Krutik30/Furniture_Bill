
import {useLocation} from 'react-router-dom';
// @ts-ignore
import { registerSW } from 'virtual:pwa-register';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';

const ServiceWorkerUpdateDialog = () => {

    const [newWorkerAvailable, setNewWorkerAvailable] = useState();

    const location = useLocation();
    const locationNow = location.pathname.split('/');
    let updateAllowed = true;
    if(locationNow.length > 1){
        // console.log(location.length);
        updateAllowed = !(locationNow.includes("add-new") || locationNow.includes("edit"))
    }

    // have to place service worker inside the router to be able to use the hook useLocation, which tracks if the user has navigated away from a form & prompts to update then.
    const intervalMS = 60000; // 60 * 60 * 1000; // this is 1 hour (60 * 60 * 100)
    const updateSW = registerSW({
    onNeedRefresh() {
        console.log("inside on need refresh", {updateAllowed});
        if (!newWorkerAvailable){
            // @ts-ignore
          setNewWorkerAvailable(oldWorker => {
              // console.log({locationNow});
              console.log({oldWorker});
              return {type: "serviceWorker"}
          });
        }
        // alert("---- New version of app is available. ----");
    },
    onOfflineReady() { },
    onRegisteredSW(swUrl: any, r: any) {
        r && setInterval(async () => {
        // console.log("--- Checking for new version of app ---", {swUrl, r});
        if (!(!r.installing && navigator))
            return

        if (('connection' in navigator) && !navigator.onLine)
            return

        const resp = await fetch(swUrl, {
            'cache': 'no-store'
        });
        // console.log({resp, r}, r.update);
        
        if (resp?.status === 200){
            let swUpdateRes = await r.update();
            // console.log("swupdateRes 101", {swUpdateRes})
        }
        }, intervalMS)
    }
    });
    // console.log({openDialog, locationNow, updateAllowed});

    return (
        // @ts-ignore
        <Dialog open={newWorkerAvailable?.type === "serviceWorker" && updateAllowed}>
        <DialogTitle>An update is available!</DialogTitle>
        <DialogContent>
          Please update your app for latest updates<br/>
          New Features: <br/>
            

          {/* Enhancements:<br/>
          - Old Order Edit on missing images bug solved. */}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              console.log("inside universalpopup click - lets go");
              updateSW(true);
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    )
};

export default ServiceWorkerUpdateDialog;