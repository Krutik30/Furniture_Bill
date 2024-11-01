import { Box, List, ListSubheader, styled } from "@mui/material"
import { routeObjectWithNavbarSettings, routeObjectWithNavbarSettingsType } from "../../../router";
import { NavListRoot } from "./NavList";

// ----------------------------------------------------------------------

type ListSubheaderStyleProps = {
  sx?: {
    opacity?: number;
  };
  children?: React.ReactNode;
};

export const ListSubheaderStyle = styled((props: ListSubheaderStyleProps) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

type inputProps = {
  isCollapse: boolean
}

const NavSectionVertical = ({isCollapse, ...props}: inputProps) => {
  return (
    <Box {...props}>
      {routeObjectWithNavbarSettings[0].children.map((parentObj: routeObjectWithNavbarSettingsType, parentIndex: number) => {
        let parentComponent = parentObj.subheader && (
          <List key={parentIndex} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle
              sx={{
                ...(isCollapse && {
                  opacity: 0
                })
              }}
            >
              {parentObj.subheader}
            </ListSubheaderStyle>
          </List>
        );
        
        parentComponent = parentObj.icon && (
          <List key={parentIndex} disablePadding sx={{ px: 2 }}>
            <NavListRoot key={parentObj.title + parentIndex} list={parentObj} isCollapse={isCollapse} />
          </List>
        )

        const childComponents = parentObj.children?.map((childObj: routeObjectWithNavbarSettingsType['children'], childIndex: number) => (
          childObj.icon && (
            <List key={parentIndex} disablePadding sx={{ px: 2 }}>
              <NavListRoot key={childObj.title + childIndex} list={childObj} isCollapse={isCollapse} />
            </List>
          )
        ));

        return [parentComponent, ...(childComponents || [])];
      }).flat()}
    </Box>
  )
};

export default NavSectionVertical;