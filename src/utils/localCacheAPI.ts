import { loginSuccessToken, ownerCompanyType, userTypes } from "sb-schema-and-types";

type cacheTypes<T> = {
  getItem: () => T,
  createOrUpdate: (newValue: T) => void,
  deleteItem: () => void
}

export class LocalCacheAPI {
    cachedItem: any
    keyName!: string
    constructor(localStorageName: string) {
        this.keyName = localStorageName;
        const persisted = localStorage.getItem(localStorageName);
        if (!persisted || persisted === 'undefined' || persisted === 'null') {
            this.cachedItem = ''
        } else {
            this.cachedItem = JSON.parse(persisted)
        }
    }

    getItem() {
        return this.cachedItem;
    }

    createOrUpdate(newValue: any) {
        // console.log({newValue});
        // console.log(this, this.cachedItem);
        this.cachedItem = newValue
        this.persist();
    }

    deleteItem() {
        localStorage.removeItem(this.keyName);
        this.cachedItem = '';
    }

    private persist() {
      localStorage.setItem(this.keyName, JSON.stringify(this.cachedItem));
      window.dispatchEvent( new Event(this.keyName, {bubbles: true, cancelable: false}) );
    }
}

export const authTokensCache: cacheTypes<loginSuccessToken['tokens']> = new LocalCacheAPI('authTokens');
export const distinctSizesCache: cacheTypes<string[]> = new LocalCacheAPI('distinctSizes');
export const distinctColorsCache: cacheTypes<string[]> = new LocalCacheAPI('distinctColors');
export const ownerCompaniesCache: cacheTypes<ownerCompanyType[]> = new LocalCacheAPI('ownerCompanies');
export const sessionOgCompanyCache: cacheTypes<ownerCompanyType> = new LocalCacheAPI('sessionOgCompany');
export const teamMembersCache: cacheTypes<userTypes[]> = new LocalCacheAPI('teamMembers');
export const userObjectCache: cacheTypes<loginSuccessToken['user']> = new LocalCacheAPI('userObject');
export const userPermissionsCache = new LocalCacheAPI('userPermissions');

export const clearLocalCache = () => {
  authTokensCache.deleteItem();
  distinctSizesCache.deleteItem();
  ownerCompaniesCache.deleteItem();
  sessionOgCompanyCache.deleteItem();
  teamMembersCache.deleteItem();
  userObjectCache.deleteItem();
  userPermissionsCache.deleteItem();
  localStorage.clear();
}