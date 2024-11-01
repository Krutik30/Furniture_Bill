import { atom, selector, atomFamily } from "recoil";
import { ReactElement } from "react";



export interface globalFormPopupType {
    type: string,
    component: ReactElement,
    onSuccess?: Function,
    onFailure?: Function
}

export const globalFormPopupState = atom<[] | globalFormPopupType[]>({
    key: 'globalFormPopupState',
    default: []
});

export const removePaymentEmptyAgainstInvoiceState = atom<Function>({
    key: 'removePaymentEmptyAgainstInvoiceState',
    default: () => null
})

export const isSidebarOpenState = atom({
    key: 'isSidebarOpen',
    default: false
})

export const isOnlineState = atom ({
    key:'isOnline',
    default: true
});

export const listFiltersState = atom<any>({
    key:'listFilters',
    default:{
        showFilter:false
    }
})

// FIXME: This is not needed probably - Krishna / 13.06.23
export const clientDataAtom = atomFamily({
    key:"clientData",
    default:{}
});

export const filteredIdIndexesState = atom<number[]>({
    key: 'filteredIdIndexes',
    default: []
});

export const selectedIdIndexesState = atom<number[]>({
    key: 'selectedIdIndexes',
    default: []
});

export const globalSearchState = atom<string>({
    key: 'globalSearch',
    default:""
})

// didn't want to use global state for this, but didn't have any choice in my mind at the moment, if you have better approach then please update this
export const globalSearchFormValue = atom<any>({
    key: 'globalSearchFormValue',
    default: {defaultValue:null,voucherData:[]}
})

export const sessionPermissionState = atom<any>({
    key: 'sessionPermission',
    default: {
        allow: true,
        activeUsers: []
    }
})


export const canVerticalNavbarCollapseState = atom({
    key: 'canVerticalNavbarCollapse',
    default: true
});

export const verticalNavbarHoverState = atom({
    key: 'verticalNavbarHover',
    default: false,
});

export const pageTitleState = atom({
    key: 'pageTitle',
    default: 'Page Title'
});

export const isVerticalNavbarOpenState = selector({
    key: 'isVerticalNavbarOpen',
    get:({get}) => {
        const canVerticalNavbarCollapse = get(canVerticalNavbarCollapseState);
        const verticalNavbarHover = get(verticalNavbarHoverState);
        return canVerticalNavbarCollapse ? verticalNavbarHover : true
    },
});

type globalAlertPopupType = {
    content: string,
    onClose: Function,
    onDisagree?: Function,
    onAgree: Function,
    title: string,
};

export const globalAlertPopupState = atom<null | globalAlertPopupType>({
    key: 'globalAlertPopup',
    default: null
});