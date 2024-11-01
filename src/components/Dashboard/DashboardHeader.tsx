import { useRecoilValue, useSetRecoilState } from "recoil";
import { HEADER, NAVBAR } from "../../config"
import useOffSetTop from "../../hooks/useOffSetTop"
import useResponsive from "../../hooks/useResponsive";
import { isVerticalNavbarOpenState, pageTitleState, verticalNavbarHoverState } from "../../utils/recoil_state";
import { Fragment } from "react";
import { AppBar, IconButton, Stack, Toolbar, Tooltip, Typography, styled } from "@mui/material";
import cssStyles from "../../utils/cssStyles";
import SvgIconStyle from "../SvgIconStyle";
import { useNavigate } from "react-router";
// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isVerticalNavbarOpen' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isVerticalNavbarOpen, isOffset, verticalLayout, theme }: any) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(!isVerticalNavbarOpen && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

export const DashboardHeader = () => {
    const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT);
    const isDesktop = useResponsive('up', 'md');
    const isVerticalNavbarOpen = useRecoilValue(isVerticalNavbarOpenState);
    const setVerticalNavbarHover = useSetRecoilState(verticalNavbarHoverState);

    return (
        <Fragment>
            {/* @ts-ignore */}
            <RootStyle isVerticalNavbarOpen={isVerticalNavbarOpen} isOffset={isOffset}>
                <Toolbar
                    sx={{
                        my: 'auto',
                        minHeight:0,
                        px: { xs: 1, md: 5 },
                    }}
                >
                    <Stack direction="row" justifyContent='space-between' alignItems='center' width={1}>
                        <Stack direction="row" alignItems='center'>
                            {!isDesktop && (
                                <IconButton onClick={() => setVerticalNavbarHover(true)} sx={{ color: 'text.primary' }}>
                                    <SvgIconStyle iconFileName="menu-2-fill" />
                                </IconButton>
                            ) }   
                            <PageTitle isDesktop={isDesktop}/>
                        </Stack>
                        <HeaderRightSide isDesktop={isDesktop} />
                    </Stack>
                </Toolbar>

            </RootStyle>
        </Fragment>
    )
};

type propTypes = {
    isDesktop: boolean | null
};

const HeaderRightSide = ({isDesktop}: propTypes) => {
    isDesktop
    return (
        <>
        </>
    )
};

const PageTitle = ({isDesktop}: propTypes) => {
    const navigate = useNavigate();
    const pageTitle = useRecoilValue(pageTitleState);

    return (
        <Stack direction='row' alignItems='center'>
          {isDesktop && <Tooltip title='Esc'>
                <IconButton
                    onClick={() => navigate(-1)}
                    sx= {{
                        borderRadius: '50%',
                        mr: 1
                    }}
                >
                    <SvgIconStyle iconFileName="arrow-back"/>
                </IconButton>
            </Tooltip>}
            <Typography variant="h4" color='#212B36'>
                {pageTitle}
            </Typography>
        </Stack>
    )
}