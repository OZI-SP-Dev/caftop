import {
  Avatar,
  Tooltip,
  makeStyles,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-components";
import { useContext } from "react";
import { UserContext } from "@providers/UserProvider";
import { tokens } from "@fluentui/react-theme";
import { Link } from "react-router-dom";
import { useDefaultHelpLink } from "@api/DefaultData";
import { useMyRoles } from "@api/RolesApi";

/* FluentUI Styling */
const useStyles = makeStyles({
  navHeader: {
    display: "flex",
    position: "fixed",
    zIndex: 1000,
    width: "100%",
    height: "3em",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:
      import.meta.env.MODE === "testing" || import.meta.env.DEV
        ? tokens.colorPaletteDarkOrangeBackground3
        : tokens.colorBrandBackground,
  },
  navHeaderPadding: {
    height: "3em",
  },
  navHeaderSiteName: {
    fontWeight: "bold",
    fontSize: "1.5em",
    marginLeft: "1em",
    color: tokens.colorBrandBackgroundInverted,
  },
  navLink: {
    marginLeft: "1em",
    marginRight: "1em",
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
    color: tokens.colorBrandBackgroundInverted,
  },
  subNavLink: {
    marginLeft: "1em",
    marginRight: "1em",
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
  },
  navHelp: {
    marginLeft: "auto", // Force the help link and Avatar icon to be positioned at the right most side of the toolbar
    marginRight: "1em",
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
    color: tokens.colorBrandBackgroundInverted,
  },
  navAvatar: { marginLeft: "1em", marginRight: "5px" },
});

export const AppHeader = () => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const helpLink = useDefaultHelpLink();
  const myRoles = useMyRoles();

  const title =
    import.meta.env.MODE === "testing" || import.meta.env.DEV
      ? "CAFTOP Generator TEST"
      : "CAFTOP Generator";

  return (
    <>
      <div role="heading" aria-level={1} className={classes.navHeader}>
        <Link to="/" className={classes.navHeaderSiteName}>
          {title}
        </Link>
        {myRoles.data?.isFocalPoint && (
          <Link to="/CAFTOPs" className={classes.navLink}>
            CAFTOPs
          </Link>
        )}
        <Link to={helpLink} className={classes.navHelp} target="_blank">
          Help
        </Link>
        <Popover trapFocus={true} closeOnScroll={true} withArrow={true}>
          <PopoverTrigger>
            <Tooltip
              relationship="description"
              content={userContext.user ? userContext.user?.Title : ""}
            >
              <Avatar
                className={classes.navAvatar}
                image={
                  // If we don't have an imageUrl such as when Impersonating, just show Initials
                  userContext.user?.imageUrl
                    ? { src: userContext.user?.imageUrl }
                    : undefined
                }
                name={userContext.user?.Title}
                size={32}
              />
            </Tooltip>
          </PopoverTrigger>
          <PopoverSurface aria-label="Your roles">
            {
              /* If user is a Focal Point */
              myRoles.data?.isFocalPoint && (
                <ul>
                  <li key="focalPoint">Focal Point</li>
                </ul>
              )
            }
            {
              /* If the user has no privleged role(s), just state standard account */
              !myRoles.data?.isFocalPoint && (
                <ul>
                  <li>Standard user account</li>
                </ul>
              )
            }
          </PopoverSurface>
        </Popover>
      </div>
      {/* The below div is set to the same height of the above div,
            to ensure all conent loaded has proper padding at the top so that it isn't below the header */}
      <div className={classes.navHeaderPadding}></div>
    </>
  );
};
