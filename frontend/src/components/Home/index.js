import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {
    const currentUser = useSelector(state => state.session.user)
    return (
        <div className="the-home-container">
            <div className="home-image">
                <img id="home-image-photo" src="https://afar.brightspotcdn.com/dims4/default/f9ddc75/2147483647/strip/true/crop/1500x782+0+109/resize/840x438!/format/webp/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.amazonaws.com%2Fbrightspot%2Fd2%2F1d%2Faf582797f5374a5242348f4c2d96%2Foriginal-airbnb-20categories-20-20design-20-202.jpg" alt=""/>
            </div>
            <div className="travel-them-spots">
                <img id="travel-spots-image" src="https://a0.muscache.com/im/pictures/miso/Hosting-19750790/original/b7024e8d-f370-4123-859d-1c6840079220.jpeg?im_w=720" alt=""/>
                <h1 id="dont-know" className="where-to-go">Don't Know Where To Go?</h1>
                <h1 id="host-nitrogen">Host With NitrogenBnB</h1>
            </div>
            <div className="travel">
                <Link exact to="/spots">
                    <button id="travel-btn">Travel</button>
                </Link>
            </div>
            {currentUser &&
            <div className="become-a-host">
                <Link exact to="/spots/host">
                    <button id="host-btn">Become a Host</button>
                </Link>
            </div>
            }
        </div>
    )
}


export default Home
