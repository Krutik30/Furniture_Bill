import { Stack, StackProps, Typography } from "@mui/material"
import { FC, ReactElement } from "react"

type inputProps = StackProps & {
    direction?: 'row' | 'column'
    headerRight?: ReactElement,
    title?: string
    titleJustifyContent ?: StackProps['justifyContent']
}

export const ResponsiveStack:FC<inputProps> = ({titleJustifyContent = 'flex-start', children, direction, headerRight, title, ...props}) => {
    return (
        <Stack width={1} alignItems="flex-start" spacing={1.5} {...props}>
            <Stack direction='row' justifyContent={titleJustifyContent} alignItems='center' width='100%'>
                <Typography variant="h6" sx={{ color: "text.disabled" }} alignSelf='center'>
                    {title}
                </Typography>
                {headerRight}
            </Stack>
            <Stack
                direction={direction ?? {xs: 'column', md: 'row'}}
                spacing={2}
                sx={{alignItems: 'center', justifyContent: 'center'}}
                width={1}
            >
                {children}
            </Stack>
        </Stack>
    )
}