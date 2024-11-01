import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import primaryKeyConstrains from "../utils/PrimaryKeyConstrains";
import { IconButton, MenuItem, Popover } from "@mui/material";
import SvgIconStyle from "./SvgIconStyle";
import { ListDeleteButton } from "./ListDeleteButton";

export const TableMoreMenu = ({ row, tableName, extraComp }: {
    row: any,
    tableName: 'design' | 'sku' | 'order' | 'orderDesignJt' | 'orderSku' | 'ownercompany' | 'customer' | 'agent' | 'transport',
    extraComp?: ReactNode
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    const navigate = useNavigate();
  
    const constrain = primaryKeyConstrains(row.original, tableName)
  
    return (
      <>
        <IconButton onClick={handleClick}>
          <SvgIconStyle iconFileName={'more-vert'} sx={{ width: 20, height: 20 }} />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <>
            <MenuItem>
              {extraComp}
            </MenuItem>
            <MenuItem
              onClick={() => {
                // @ts-ignore
                const navigateString = `${tableName === 'order' ? '/' : ''}${tableName}/edit?${Object.keys(constrain).map((property: string)=> `${property}=${constrain[property]}`).join('&')}`
                navigate(
                  `${navigateString}`
                );
                handleClose();
              }}
            >
              <SvgIconStyle iconFileName={"edit-fill"} />
              Edit
            </MenuItem>
            <ListDeleteButton
              handleCloseMenu={handleClose} 
              docId={constrain}
              voucherType={tableName}
            />
          </>
        </Popover>
      </>
    )
  }