import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/images/Frame 75.svg";
import cart from "./assets/images/shopping-bag.png";
import { useContext, useEffect, useState } from "react";
import { myContext } from "./App";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const{state} = useContext(myContext);
  const[count,setCount]=useState(0);
  const[istoggle,setToggle]=useState(false)
  const[user, setUser] = useState(null);
 
  const nav = useNavigate();

  const handleNav = () => {
    nav("./Cart");
  };
const handleSignIn=()=>{
  nav("/Signup")
}


  useEffect(() => {
    const auth = getAuth();
    const unmount = auth.onAuthStateChanged((user) => {
      // console.log(user)
      if (user) {
        setUser(user);
      }
    });
    setCount(state.Cart.length);
    return unmount;
  },[state.Cart]);

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
            <div className="col-3">
            <div className="logo">
            <Link to="/">
              <img src={logo} alt="Fashtion" />
            </Link>
          </div>
            </div>
<div className="col-9 m-flex">
<div className="menu" onClick={()=>setToggle(!istoggle)} >
            <i className="ri-menu-2-fill"></i>
          </div>
          <div className={istoggle ? "links open" : "links"}>
            <nav>
              <ul>
                <li>
                  <Link to="/" onClick={()=>setToggle(false)}>Home</Link>
                </li>
                <li>
                  <Link to="/Category" onClick={()=>setToggle(false)}>Category</Link>
                </li>
              </ul>
            </nav>
            
            <div className="cart-btn">
            <div className="btn">
              {user ? (
                <>
                  <span>{user.displayName}</span>
                  <button onClick={handleSignOut} className="signout-btn">
                    Sign Out
                  </button>
                </>
              ) : <button onClick={handleSignIn}>Sign Up</button>}
            </div>
            {
               <span onClick={handleNav} className="cart">
              <i className="ri-shopping-cart-line"></i>
              <sub>{user? count : 0}</sub>
            </span> 
            }
            </div>
          </div>
          </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
