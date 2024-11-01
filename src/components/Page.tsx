import { Helmet } from 'react-helmet-async';
import { FC, Fragment, ReactElement, ReactNode, forwardRef, useEffect } from 'react';
// @mui
import { Box, styled } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { canVerticalNavbarCollapseState, pageTitleState } from '../utils/recoil_state';
import { HEADER, NAVBAR } from '../config';
import { Navigate, Params, useLocation, useParams } from 'react-router';
import { FallbackProps } from 'react-error-boundary';
import { rhfSubmitButtonProps } from './rhf-elements/RhfSubmitButton';
import { getUserHasLoggedIn } from '../utils/getUserHasLoggedIn';

// ----------------------------------------------------------------------
const MainStyle = styled('main', {
    shouldForwardProp: (prop) => prop !== 'canVerticalNavbarCollapse',
    // eslint-disable-next-line 
  })(({ canVerticalNavbarCollapse, theme }: any) => ({
    flexGrow: 1,
    paddingTop: HEADER.MOBILE_HEIGHT + 10,
    paddingBottom: HEADER.MOBILE_HEIGHT + 24,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
      paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
      width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
      transition: theme.transitions.create('margin-left', {
        duration: theme.transitions.duration.shorter,
      }),
      ...(canVerticalNavbarCollapse && {
        marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
      }),
    },
  }));

type inputProps = {
    actionType?: rhfSubmitButtonProps['actionType'],
    Component: FC | ReactNode | ReactElement,
    title: string | ((params: Readonly<Params<string>>) => string),
    meta?: ReactNode,
} | {
    Component: ({error, resetErrorBoundary}: FallbackProps) => ReactElement,
    title: string | ((params: Readonly<Params<string>>) => string),
    meta?: ReactNode,
    error: FallbackProps['error'],
    resetErrorBoundary: FallbackProps['resetErrorBoundary']
};

const ProtectedRoute = ({children}: {children: ReactElement}) => {
  const { pathname } = useLocation();
  const openRoutes = ['/auth/login', '/auth/register'];
  const hasLoggedIn = true;
  
  // console.log({hasLoggedIn, pathname});
  return (hasLoggedIn || openRoutes.includes(pathname))
    // Do not show login path unless the user has loggedout.
    ? (pathname === '/auth/login' && hasLoggedIn)
      ? <Navigate to='/home' replace />
      : children
    : <Navigate to='/auth/login' replace />
}

export const Page = forwardRef(({ Component, title = '', meta, ...props }: inputProps, ref) => {
    const canVerticalNavbarCollapse = useRecoilValue(canVerticalNavbarCollapseState);
    const setPageTitle = useSetRecoilState(pageTitleState);
    const params = useParams();
    if (typeof title === 'function') title = title(params);

    //Capitalise the string.
    const titleToShow = title.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    useEffect(() => setPageTitle(titleToShow), [title]);

    return (
        <Fragment>
            <Helmet>
                <title>{`${titleToShow} | Smart Marketing`}</title>
                {meta}
            </Helmet>

            {/* eslint-disable-next-line   */}
            {/* @ts-ignore */}
            <MainStyle canVerticalNavbarCollapse = {canVerticalNavbarCollapse}>
                <ProtectedRoute>
                    <Box ref={ref} sx={{minHeight: '100vh'}}>
                        {/* eslint-disable-next-line   */}
                        {/* @ts-ignore */}
                        <Component {...props} />
                      {/* eslint-disable-next-line   */}
                    </Box>
                </ProtectedRoute>
            </MainStyle>
        </Fragment>
    )
});
