export default class AsyncDataFetch {
    data = undefined;
    status = "pending";
    error = undefined;
    promise = null;
  
    constructor(promise : any) {
        this.promise = promise
          .then((data: any) => {
            // await new Promise(res => setTimeout(res, 2000));
            this.status = "success";
            this.data = data;
          })
          .catch((error: any) => {
            console.log({error});
            this.status = "error";
            this.error = error;
          });
    }

    read() {
      switch (this.status) {
        case "pending":
          throw this.promise;
        case "error":
          throw this.error;
        default:
          return this.data;
      }
    }
  }