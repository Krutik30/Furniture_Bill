import { Navigate } from "react-router";
import SvgIconStyle from "./components/SvgIconStyle";
import { Page } from "./components/Page";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { DashboardLayout } from "./components/Dashboard/DashboardLayout";
const getIcon = (name: string) => <SvgIconStyle iconFileName={name} sx={{ width: 1, height: 1 }} />;

// eslint-disable-next-line 
export type routeObjectWithNavbarSettingsType = RouteObject | any;

export const routeObjectWithNavbarSettings = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                element: <Navigate to="home" replace />,
                index: true
            },
            {
                index: true,
                path: '*',
                async lazy() {
                    const { Page404 } = await import('./pages/Page404');
                    return { element: <Page Component={Page404} title="Not Found - 404 Error" /> }
                }
            },
            {
                caseSensitive: false,
                path: "/user",
                // icon: getIcon("material-symbols-store-outline"),
                title: 'Account',
                index: true,
                async lazy() {
                    const { HomePage } = await import('./pages/homepage/HomePage');
                    return { element: <Page Component={HomePage} title="Profile" /> };
                },
            },
            {
                caseSensitive: false,
                icon: getIcon("material-symbols-home-outline-rounded"),
                index: true,
                path: '/home',
                title: 'Home',
                async lazy() {
                    const { HomePage } = await import('./pages/homepage/HomePage');
                    return { element: <Page Component={HomePage} title="Home" /> };
                }
            },
            {
                caseSensitive: false,
                path: "/bill",
                icon: getIcon("material-symbols-shopping-cart-outline-rounded"),
                title: 'Bill',
                children: [
                  {
                      index: true,
                      element: <Navigate to='/bill/add-new' />,
                      showInNavbar: false,
                  },
                  {
                      path: "/bill/add-new",
                      index: true,
                      title: 'Add Bill',
                      async lazy() {
                          const { AddEditBill } = await import('./pages/billModule/AddEditBill');
                          return { element: <Page Component={AddEditBill} title="Add Edit Bill" /> };
                      },
                  },
                ]
            }
        ]
    }
]


export const router = createBrowserRouter(routeObjectWithNavbarSettings);
