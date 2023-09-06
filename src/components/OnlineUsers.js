import { useEffect, useRef } from "react";
import { useCollection } from "../hooks/useCollection";
import useMenu from "../hooks/useMenuContext";

// components
import Avatar from "./Avatar";

// styles
import "./OnlineUsers.css";
import useMediaQuery from "../hooks/useMediaQuery";

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection("users");
  const { openMenu, setOpenMenu } = useMenu();

  const menuRef = useRef(null); // Ref for the menu container

  // Define the media query for screens below 1280px width
  const isSmallScreen = useMediaQuery("(max-width: 1280px)");

  useEffect(() => {
    const closeMenu = () => {
      setOpenMenu(false);
    };

    const handleDocumentClick = (event) => {
      console.log(event.target.parentNode)
      if (
        openMenu && 
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isSmallScreen &&
        !event.target.parentNode.classList.contains("burger-button") // Check if the click target is the burger button
      ) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isSmallScreen, openMenu]);

  return (
    <div
      ref={menuRef}
      className={`${
        openMenu ? "block" : "hidden"
      } fixed xl:static top-0 right-0 bg-[#fbfbfb] p-8 w-[280px] min-h-screen`}
    >
      <h2>All Users</h2>
      {isPending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div
            key={user.id}
            className="user-list-item flex w-full gap-2 items-center"
          >
            {user.online && (
              <span className="w-3 h-3 rounded-full bg-[#0ebb50]"></span>
            )}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
