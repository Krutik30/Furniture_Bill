import { useTheme } from "@emotion/react"
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useResponsive from "../../hooks/useResponsive";
import { canVerticalNavbarCollapseState, isVerticalNavbarOpenState, verticalNavbarHoverState } from "../../utils/recoil_state";
import { NAVBAR } from "../../config";
import { Box, Button, Drawer, Stack, styled } from "@mui/material";
import cssStyles from "../../utils/cssStyles";
import Scrollbar from "../Scrollbar";
import CollapseButton from "./CollapseButton";
import DocIllustration from "../../assets/illustration_doc";
import { LoadingButton } from "@mui/lab";
import logo from '/logo.svg';
import { useState } from "react";
import NavSectionVertical from "./nav-section/NavSectionVertical";
import NavbarAccount from "./nav-section/NavbarAccount";
import useLogout from "../../hooks/useLogout";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

export const NavbarVertical = () => {
    const theme = useTheme();
    const [canVerticalNavbarCollapse, setCanVerticalNavbarCollapse] = useRecoilState(canVerticalNavbarCollapseState);
    const isVerticalNavbarOpen = useRecoilValue(isVerticalNavbarOpenState);
    const setVerticalNavbarHover = useSetRecoilState(verticalNavbarHoverState);
    const isDesktop = useResponsive('up', 'md');

    return (
        <RootStyle
          sx={{
            width: {
              lg: isVerticalNavbarOpen
                ? NAVBAR.DASHBOARD_WIDTH
                : NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            },
            ...(canVerticalNavbarCollapse && {
              position: "absolute",
            }),
          }}
        >
            {!isDesktop && (
                <Drawer
                    open={isVerticalNavbarOpen}
                    onClose={() => setVerticalNavbarHover(false)}
                    PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
                >
                  <RenderContent 
                      canVerticalNavbarCollapse={canVerticalNavbarCollapse} 
                      isDesktop={isDesktop} 
                      isVerticalNavbarOpen={isVerticalNavbarOpen} 
                      setCanVerticalNavbarCollapse={setCanVerticalNavbarCollapse} 
                  />
                </Drawer>
            )}
    
            {isDesktop && (
              <Drawer
                  open
                  variant="persistent"
                  onMouseEnter={() => setVerticalNavbarHover(true)}
                  onMouseLeave={() => setVerticalNavbarHover(false)}
                  PaperProps={{
                  sx: {
                      width: NAVBAR.DASHBOARD_WIDTH,
                      borderRightStyle: "dashed",
                      bgcolor: "background.default",
                      transition: (theme) =>
                      theme.transitions.create("width", {
                          duration: theme.transitions.duration.standard,
                      }),
                      ...(!isVerticalNavbarOpen && {
                      width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
                      }),
                      ...(isVerticalNavbarOpen && {
                          ...cssStyles(theme).bgBlur(),
                          boxShadow: (theme: any) => theme.customShadows.z24,
                      }),
                  },
                  }}
              >
                <RenderContent 
                    canVerticalNavbarCollapse={canVerticalNavbarCollapse} 
                    isDesktop={isDesktop} 
                    isVerticalNavbarOpen={isVerticalNavbarOpen} 
                    setCanVerticalNavbarCollapse={setCanVerticalNavbarCollapse} 
                />
              </Drawer>
            )}
        </RootStyle>
    )
}

type propTypes = {
    canVerticalNavbarCollapse: boolean
    isDesktop: boolean | null
    isVerticalNavbarOpen: boolean
    setCanVerticalNavbarCollapse: SetterOrUpdater<boolean>
};

const RenderContent = ({canVerticalNavbarCollapse, isDesktop, isVerticalNavbarOpen, setCanVerticalNavbarCollapse}: propTypes) => {
  
  return (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(!isVerticalNavbarOpen && { alignItems: "center" }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction='row'>
            <img src={logo} alt='logo' />
          </Stack>
          {isDesktop && isVerticalNavbarOpen && (
            <CollapseButton
              onToggleCollapse={() => setCanVerticalNavbarCollapse((currVal) => !currVal)}
              collapseClick={canVerticalNavbarCollapse}
            />
          )}
        </Stack>
      </Stack>
      
      <NavbarAccount isCollapse={!isVerticalNavbarOpen} />
      <NavSectionVertical isCollapse={!isVerticalNavbarOpen} />
      <Box sx={{ flexGrow: 1 }} />

      <Stack
        spacing={3}
        sx={{
          px: 5,
          pb: 5,
          mt: 10,
          width: 1,
          textAlign: "center",
          display: "block",
        }}
      >
      {/* <DocIllustration />
      <LogoutButton />   */}
      </Stack>
    </Scrollbar>
  );
};

const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logout = useLogout();

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout().then(() => setIsLoggingOut(false))
  };

  return (
    <LoadingButton
      loading={isLoggingOut}
      component={Button}
      variant="contained"
      onClick={handleLogout}
      color="error"
    >
      Logout
    </LoadingButton>
  )
}