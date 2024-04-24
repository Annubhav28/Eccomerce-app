import mainimg from "./assets/images/Frame 90.png";
import Category from "./Category";
import Newarrival from "./NewArrival";
import Navbar from "./navbar";

const Home=()=>{
  return (
   <>
<Navbar />
  <div className="main">
    <div className="container">
      <div className="row align-center">
        <div className="col-6 col-mp-12">
          <div className="text-content">
            <h2 className="late">Let's Explore <span className="yellow">Unique</span> Clothes</h2>
            <p>Live for Influential and Innovative fashion.</p>
            <button>Shop Now</button>
          </div>
        </div>
        <div className="col-6 col-mp-12">
          <img loading="lazy" src={mainimg} alt="" />
        </div>
      </div>
    </div>
  </div>
  <Newarrival />
   <Category />
   

   </>
  )
}

export default Home
