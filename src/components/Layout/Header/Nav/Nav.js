import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../../app/slices/uiSlice";
import {
  SNav,
  SNavLinkContainer,
  SNavLink,
  SLink,
  SNavLabelContainer,
  SNavLabel,
  SArrowContainer,
  SArrowIcon,
} from "./styles";

//export const [openDropdown, setOpenDropdown] = null;

function Nav({ navLinks, menuToggleHandler }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const openDropdownHandler = (label) => {
    if (label === openDropdown) return setOpenDropdown(null);
    setOpenDropdown(label);
  };

  const onSelectCallback = () => {
    if (menuToggleHandler) menuToggleHandler();
    setOpenDropdown(null);
  };

  /*const onMouseEnter = () => {
    if (window.innerwith < 960) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(true);
    }
  };*/

  const onMouseLeave = () => {
    if (window.innerwith < 960) {
      setOpenDropdown(false);
    } else {
      setOpenDropdown(false);
    }
  };

  return (
    <SNav>
      {navLinks.map(({ label, link, tree }, index) => {
        const isOpen = openDropdown === label;
        return (
          <SNavLinkContainer
            key={index}
            onMouseLeave={onMouseLeave}
          >
            {link && (
              <SNavLink to={link} onClick={onSelectCallback}>
                {label}
              </SNavLink>
            )}
            {!link && (
              <SNavLabelContainer onClick={() => openDropdownHandler(label)}>
                <SNavLabel isOpen={isOpen}>{label}</SNavLabel>
                <SArrowContainer isOpen={isOpen}>
                  <SArrowIcon />
                </SArrowContainer>
              </SNavLabelContainer>
            )}
            {isOpen && (
              <Dropdown tree={tree} onSelectCallback={onSelectCallback} />
            )}
          </SNavLinkContainer>
        );
      })}
      <SLink to="/register" onClick={onSelectCallback}>
        {" "}
        REGISTER{" "}
      </SLink>
      <SLink to="/login" onClick={onSelectCallback}>
        {" "}
        LOGIN{" "}
      </SLink>
      <SLink to="/cart" onClick={onSelectCallback}>
        <Badge badgeContent={4} color="primary">
          <ShoppingCartOutlined />
        </Badge>
      </SLink>
    </SNav>
  );
}

Nav.defaultProps = {
  navLinks: [
    {
      label: "About",
      link: "/about",
      tree: null,
    },
    {
      label: "Services",
      link: null,
      tree: [
        {
          label: "About us",
          link: "/aboutus",
          branches: null,
        },
        {
          label: "AboutUs",
          link: null,
          branches: [
            {
              label: "Terms and condition",
              link: "/aboutus",
              branches: null,
            },
          ],
        },
        {
          label: "FAQ",
          link: null,
          branches: [
            {
              label: "Terms and condition",
              link: "/faq",
              branches: null,
            },
          ],
        },
      ],
    },
    {
      label: "Contact",
      link: "/contact",
      tree: null,
    },
  ],
};

export default Nav;
