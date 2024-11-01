import PropTypes from 'prop-types';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Link, ListItemText, Tooltip } from '@mui/material';
//
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from '../style';
import { isExternalLink } from '.';
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  isCollapse: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }: any) {
  const { title, path, icon, info, children , toolTip } = item;  
  const navigate = useNavigate();
  // console.log({title, path})
  const renderContent = (
    // fix me: hacky solution because key trick was not working in navigation, and don't want to show stale data to the user
    <Tooltip title={toolTip || ""}>
      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:1}} onClick={()=>{navigate(path)}}>
        {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
        {/* @ts-ignore */}
        <ListItemTextStyle disableTypography primary={title} isCollapse={isCollapse} />
        {!isCollapse && (
          <>
            {info && info}
            {children && <ArrowIcon open={open} />}
          </>
        )}
      </Box>
    </Tooltip>
  );

  if (children) {
    return (
      // @ts-ignore
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    // @ts-ignore
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      {renderContent}
    </ListItemStyle>
  ) : (
    // @ts-ignore
    <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------

NavItemSub.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

export function NavItemSub({ item, open = false, active = false, onOpen }: any) {
  const { title, path, info, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active}  />
      <ListItemText disableTypography primary={title} />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      // @ts-ignore
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    // @ts-ignore
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener" subItem>
      {renderContent}
    </ListItemStyle>
  ) : (
    // @ts-ignore
    <ListItemStyle component={RouterLink} to={path} activeSub={active}  subItem>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------

DotIcon.propTypes = {
  active: PropTypes.bool,
};

export function DotIcon({ active }: any) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

ArrowIcon.propTypes = {
  open: PropTypes.bool,
};

export function ArrowIcon({ open }: any) {
  return (
    <SvgIconStyle
      iconFileName={open ? 'arrow-ios-downward-fill' : 'arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
