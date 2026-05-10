import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/auth/AuthContext";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "About", "Tools"];

function Navbar() {
  const { username, isAuthenticated, logout } = useAuth();
  const usenavigat = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    // setAnchorElNav(null);
    usenavigat("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handelLogin = () => {
    usenavigat("/login");
  };

  const handelLogout = () => {
    logout();
    usenavigat("/");
  };
  const handelLogo = () => {
    usenavigat("/");
  };
  const handelCart = () => {
    usenavigat("/CartPage");
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  console.log("From navbar", { username });

  return (
    <AppBar position="static" sx={{ backgroundColor: "teal" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Button onClick={handelLogo}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Button onClick={handelLogo}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
            }}
          >
            <IconButton aria-label="cart" onClick={handelCart}>
              <StyledBadge badgeContent={4} color="secondary">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </StyledBadge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Grid>
                      <h2>{username}</h2>
                    </Grid>
                    <Grid>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={username}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      paddingX: 4,
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      paddingX: 4,
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      <Button variant="outlined" onClick={handelLogout}>
                        Logout
                      </Button>{" "}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button variant="contained" onClick={handelLogin}>
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
