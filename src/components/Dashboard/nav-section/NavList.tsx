import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { List, Collapse } from '@mui/material';
//
import { NavItemRoot, NavItemSub } from './NavItem';
import { getActive } from '.';

// ----------------------------------------------------------------------

NavListRoot.propTypes = {
  isCollapse: PropTypes.bool,
  list: PropTypes.object,
};

export function NavListRoot({ list, isCollapse }: any) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  // default all titles are open for now, set below true to active for onClick expand
  const [open, setOpen] = useState(true);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot item={list} isCollapse={isCollapse} active={active} open={open} onOpen={() => setOpen(!open)} />

        {!isCollapse && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(list.children || []).map((item: any, index: number) => (item?.showInNavbar !== false) && (
                <NavListSub key={item.title + '' + index} list={item} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}

// ----------------------------------------------------------------------

NavListSub.propTypes = {
  list: PropTypes.object,
};

function NavListSub({ list }: any) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={active} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item: any) => (
              <NavItemSub key={item.key} item={item} active={getActive(item.path, pathname)} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={list} active={active} />;
}
