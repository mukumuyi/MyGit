import React from "react";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { FaDatabase, FaFolderOpen } from "react-icons/fa";
import { FaChartGantt, FaEarthAsia } from "react-icons/fa6";

import { DrawerHeader } from "../atoms/DrawerHeader";
import { DrawGraph, HeaderFromLocalFile } from "../module/DataInput";

import { InputTypeSelectDef } from "../Config";

export const SideBar = (props) => {
  const {
    convDef,
    drawerWidth,
    inputData,
    open,
    setColSelector,
    setDispType,
    setDrawFlag,
    setInputData,
    setMinStart,
    setOpen,
    setOriginData,
  } = props;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleDrawer = () => {
    setOpen((prevValue) => {
      return !prevValue;
    });
  };

  const onStartDraw = async function () {
    await DrawGraph(convDef, inputData, setInputData, setMinStart);
    setDispType("Draw");
  };

  function selectFile(e) {
    HeaderFromLocalFile(e, setColSelector, setInputData, setOriginData);
  }

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader onClick={handleDrawer}>
        <IconButton
          sx={{
            marginRight: 1,
            width: 40,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key="DRAW" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={onStartDraw}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <FaChartGantt size="15pt" />
            </ListItemIcon>
            <ListItemText primary="DRAW" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {InputTypeSelectDef.map((item, index) => (
          <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                if (item.name == "LOCAL") {
                  document.getElementById("inputFileUpload").click();
                  setDispType("Import");
                } else {
                  setDispType(item.name);
                }
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.name === "LOCAL" ? (
                  <div>
                    <FaFolderOpen size="15pt" />
                    <input
                      type="file"
                      accept=".csv"
                      onChange={selectFile}
                      id="inputFileUpload"
                      style={{ display: "none" }}
                    ></input>
                  </div>
                ) : item.name === "DB" ? (
                  <FaDatabase size="15pt" />
                ) : (
                  <FaEarthAsia size="15pt" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
