import { useEffect } from "react"
import { Outlet, useLocation } from "react-router"
import { Box } from "@mui/material"
import { DashboardHeader } from "./DashboardHeader"
import { useSetRecoilState } from "recoil"
import { verticalNavbarHoverState } from "../../utils/recoil_state"
import { NavbarVertical } from "./NavbarVertical"
import { ErrorFallback, SuspenseAndErrorBoundary } from "../SuspenseAndErrorBoundary"
import { Page } from "../Page"
import { FallbackProps } from "react-error-boundary"
import GlobalFormDialog from "../globalFormDialog"
import ServiceWorkerUpdateDialog from "./ServiceWorkerUpdateDialog"

export const DashboardLayout = () => {

    const { pathname } = useLocation();

    const setVerticalNavbarHover = useSetRecoilState(verticalNavbarHoverState);

    // Things to reset on route change.
    useEffect(() => {
        // Scroll to Top.
        window.scrollTo(0, 0);

        // Page Title Change

        // collapse the vertical navbar if not fixed.
        setVerticalNavbarHover(false);

    }, [pathname]);

    const ErrorFallbackWithPage = (props: FallbackProps) => 
    <Page
        Component={ErrorFallback}
        title='Error'
        {...props}
    />

    return (
      <Box
          sx={{
              display: {lg: 'flex'},
              minHeight: { lg: 1}
          }}
      >
        <DashboardHeader />
        <NavbarVertical />
        <SuspenseAndErrorBoundary 
            errorFallback={ErrorFallbackWithPage}
        >
            <Outlet />
        </SuspenseAndErrorBoundary>
        <ServiceWorkerUpdateDialog />
        <GlobalFormDialog />
      </Box>
    )
};