import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/images/Frame 75.svg";
import cart from "./assets/images/shopping-bag.png";
import { useContext, useEffect } from "react";
import { myContext } from "./main";
import { useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const navbar = () => {
  const { state } = useContext(myContext);
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  const handleNav = () => {
    nav("./Cart");
  };
  // console.log(user)

  useEffect(() => {
    const auth = getAuth();
    const unmount = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return unmount;
  }, [onAuthStateChanged]);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        nav("/Signup");
        setUser(null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  

  return (
    <>
      <header className="wrap-1">
        <div className="container">
          <div className="row align-center">
            <div className="col-3 col-ml-6">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="fashion" />
                </Link>
              </div>
            </div>
            <div className="col-9 col-ml-6 align-center">
              <div className="navbar">
                <nav className="hover_link">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/Category">Category</Link>
                    </li>
                  </ul>
                </nav>
                <div className="btn">
                  {user ? (
                    <>
                      {user.isAnonymous ? (
                        <span>Hello Guest</span>
                      ) : (
                        <span>{user.displayName}</span>
                      )}
                      <button onClick={handleSignOut} className="signout-btn">
                        Sign Out
                      </button>
                    </>
                  ) : null}

                  <span onClick={handleNav} className="cart">
                    <i className="ri-shopping-cart-line"></i>
                    <sub>{state.Cart.length}</sub>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default navbar;
