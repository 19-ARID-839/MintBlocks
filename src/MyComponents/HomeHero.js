import React from 'react'
import './HomeHero.css'
import {Link} from 'react-router-dom';
import HomeHeroImage from '../Images/home-hero.png'
const Home = () => {
    return (
        <>
            <section className="">
                <div className="home-hero-section">
                    <div className="home-hero-section-p home-hero-section-p1">
                        <h2>Welcome To Mint Blocks</h2>
                        <p>Explore Digital Collectibles That You Love To Watch. On Mint Blocks you can mint & buy NFTs. So, lets collect all the digital arts where you get emotionally connect.</p>

                        <Link to="/explore">
                            <button className="btn btn-outline-light btn-lg " type="button">
                                Explore NFTs
                            </button>
                        </Link>
                    </div>
                    <div className="home-hero-section-p home-hero-section-p2">
                        <img  src={HomeHeroImage} alt="Hero Image" />
                    </div>
                </div>
            </section>





        </>


    )
}

export default Home
