import { useNavigate } from "react-router-dom";
// import { authTokensCache, clearLocalCache } from "../utils/localCacheAPI";
import { LocalDB } from "../db/localdb";
// import { customFetch } from "../utils/customFetch";
// import { toast } from "react-toastify";
// import { toastErrorSettings, toastSuccessSettings } from "../config";

const useLogout = () => {
    const navigate = useNavigate();
    const logout = async () => {
      console.log("logout attempt");
      LocalDB.delete().then(localdbDeleteRes => console.log({localdbDeleteRes}));
      // const authTokens = authTokensCache.getItem();
      // customFetch('/v1/auth/logout', {
      //   method: 'post',
      //   credentials: 'omit',
      //   body: {refreshToken: authTokens?.refresh?.token}
      // })
      //   .then(() => {
      //     toast.success('Logout succesful.', toastSuccessSettings);
      //   })
      //   .catch((err) => {
      //     console.log({err});
      //     toast.error('Error during logout.', toastErrorSettings);
      //   });

      // clearLocalCache();   
      navigate('/auth/login');
      return;
    };
    return logout;
};

export default useLogout;