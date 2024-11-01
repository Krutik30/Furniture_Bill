import { Box, Button, CircularProgress, Stack, Typography, styled } from "@mui/material";
import { PropsWithChildren, ReactElement, Suspense, useEffect } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";
import { app_version } from "../config";

export const ErrorFallback = ({ error, resetErrorBoundary }:FallbackProps) => {

    const locationNow = location.pathname;
    // const errorReporter = useErrorReporter();
    // errorReporter(error);
    console.log("Error Fallback", {error})
    const navigate = useNavigate()

    useEffect(() => {
      if (error.status === 401) resetErrorBoundary();
    }, []);
    
    return (
      <Box className="error" color="red">
        <Box sx={{p:1}}>
          <Typography variant="h5">
            Something Went Wrong: 
          </Typography>
          <Typography variant="h6">
            Try to reload this page or restart the app
          </Typography>
          <Typography variant="body1">
            Please send the screenshot of this page to <a href="tel:9638051000">7990451310</a>
          </Typography>
          <Typography>
            version: {app_version}
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{
                position: "fixed",
                bottom: (theme) => theme.spacing(7),
                right: (theme) => theme.spacing(15)
                }}>
            <Button 
              variant="contained"
              onClick={()=>navigate(-1)}>
              Back
            </Button>
            <Button 
              variant="contained"
              onClick={()=>navigate(0)}>
              Reload
            </Button>
          </Stack>
          <Typography>
            url: {locationNow+window.location.search}
          </Typography>
        <Box m={1} p={0.5} sx={{overflow:"hidden"}}>
          <Typography>
            { error.customMessage?.length !== 0 ? error.customMessage : error.message ||""}
          </Typography>
          <Typography>
            {error.stack||""}
          </Typography>
        </Box>
        </Box>
        {/* <p>Something went wrong...</p>
        <pre>{error.message || ''}</pre>
        <pre>{error.stack.slice(0,120) || ''}</pre> */}
      </Box>
    );
}

export const ErrorBoundaryWithFallback = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

type SuspenseWithFallbackProps = {
  suspenseUI?: ReactElement;
};

const RootStyle = styled('div')(({ theme }) => ({
  width: "100%",
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

export const SuspenseWithFallback = ({ children, suspenseUI }: PropsWithChildren<SuspenseWithFallbackProps>) => (
  <Suspense fallback={<RootStyle>{suspenseUI}</RootStyle>}>
    {children}
  </Suspense>
);

export const SuspenseAndErrorBoundary = ({
  children,
  errorFallback,
  suspenseUI = <CircularProgress />,
}: PropsWithChildren<{ errorFallback?: (props: FallbackProps) => ReactElement } & SuspenseWithFallbackProps>) => {
  return (
    <ErrorBoundary FallbackComponent={errorFallback || ErrorFallback}>
      <SuspenseWithFallback suspenseUI={suspenseUI}>
        {children}
      </SuspenseWithFallback>
    </ErrorBoundary>
  );
};