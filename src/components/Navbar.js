import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { FiMenu } from "react-icons/fi";
// styles & images
import "./Navbar.css";
import Temple from "../assets/temple.svg";
import useMenu from "../hooks/useMenuContext";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const { openMenu, setOpenMenu } = useMenu();
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled={isPending}>
                {isPending ? "Logging out..." : "Logout"}
              </button>
            )}
          </li>
        )}
        <li>
          <button
            className="ml-4 px-3 py-2 lg:hidden burger-button"
            onClick={() => setOpenMenu(true)}
          >
            <FiMenu size={24} className="burger-button" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
