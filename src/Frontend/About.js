import React from 'react';
import './About.css'
const About = () => {
  
  return (
      <>
    <div className="about-section">
  <h1>About Us Page</h1>
  <p>Mint Blocks mainly focus on emotional NFTs. Here you can mint and collect NFTs that you love.</p>
  <p>Explore Digital Collectibles That You Love To Watch. On Mint Blocks you can mint & buy NFTs. So, lets collect all the digital arts where you get emotionally connect.</p>
</div>

<h2 className="about-main-head">Our Team</h2>
<div className="row">
  <div className="column">
    <div className="card">
      {/* <img src="/w3images/team1.jpg" alt="Jane" /> */}
      <div className="container">
        <h2>Muhammad Shoaib</h2>
        <p className="title">19-ARID-839</p>
        {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
        <p>shoaib@mintblocks.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      {/* <img src="/w3images/team2.jpg" alt="Mike" /> */}
      <div className="container">
        <h2>Muhammad Usaid</h2>
        <p className="title">19-ARID-841</p>
        {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
        <p>usaid@mintblocks.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      {/* <img src="/w3images/team3.jpg" alt="John" /> */}
      <div className="container">
        <h2> Kashif Mahmood</h2>
        <p className="title">19-ARID-808</p>
        {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
        <p>kashif@mintblocks.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default About
