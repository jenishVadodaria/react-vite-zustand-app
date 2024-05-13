import { Menu, Center, Container } from "@mantine/core";
import classes from "./Header.module.css";
import { useAuthData } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export function LayoutHeader() {
  const { user, setAuthData, setAccessToken } = useAuthData();
  const links = [
    {
      label: `${user ? user?.first_name + " " + user?.last_name : "N/A"}`,
      links: [{ link: "/logout", label: "Logout" }],
    },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthData({ authData: { access_token: null }, user: null });
    setAccessToken({ access_token: null });
    navigate(ROUTES.auth.login);
  };
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={handleLogout}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              //   href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className={classes.downsvg}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown className={classes.dropdown}>
            {menuItems}
          </Menu.Dropdown>
        </Menu>
      );
    }
  });

  return (
    <header className={classes.header}>
      <Container fluid p={0} m={0} pr={70} w={"100%"} h={"100%"}>
        <div className={classes.inner}>{items}</div>
      </Container>
    </header>
  );
}
