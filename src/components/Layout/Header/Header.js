import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../app/slices/uiSlice";
import {
  SHeader,
  SHeaderHeight,
  SHeaderFixed,
  SLeft,
  SCenter,
  SRight,
  SLogoLink,
  SLogo,
  SLinkR,
  SMenuToggleButton,
  SMenuIcon,
  SCloseIcon,
  SMenu,
} from "./styles";

import Nav, {setOpenDropdown} from "./Nav/Nav";

const Header = () => {
  const dispatch = useDispatch();
  const { menuOpen } = useSelector((state) => state.ui);
 

  const menuToggleHandler = () => {
    dispatch(uiActions.menuToggle());
  };
  const menuCloseHnadler = () => {
    if (menuOpen) dispatch(uiActions.menuClose());
  };

  return (
    <>
      <SHeaderHeight />
      <SHeaderFixed>
        <SHeader>
          <SLeft>
            <SLogoLink to="/" onClick={menuCloseHnadler}>
              <SLogo src="./logo-png.png" />
            </SLogoLink>
          </SLeft>
          <SCenter>
            <Nav />
          </SCenter>
          <SRight>
            <SLinkR to="/register" > REGISTER </SLinkR>
            <SLinkR to="/login"> LOGIN </SLinkR>
            <SLinkR to="/cart">
              <Badge badgeContent={4} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </SLinkR>
            <SMenuToggleButton onClick={menuToggleHandler}>
              {!menuOpen ? <SMenuIcon /> : <SCloseIcon />}
            </SMenuToggleButton>
          </SRight>
        </SHeader>
      </SHeaderFixed>
      <SMenu style={menuOpen ? { left: 0 } : {}}>
        <Nav menuToggleHandler={menuToggleHandler} />
      </SMenu>
    </>
  );
};

export default Header;
