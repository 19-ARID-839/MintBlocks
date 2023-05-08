import React from 'react'
import './Collections.css'

const FeaturedCollections = () => {
  return (
    <div className="container">
     <h2 className="featured-collection-main-title">Industries <b>We Cover</b></h2>
     <div className="fc-list">
         <div className="fc-list-p fc-list-p1">
             <h3>Games</h3>
         </div>
         <div className="fc-list-p fc-list-p2">
         <h3>Arts</h3>
         </div>
         <div className="fc-list-p fc-list-p3">
         <h3>Sports</h3>
         </div>
         <div className="fc-list-p fc-list-p4">
         <h3>Photography</h3>
         </div>
     </div>
    </div>
  )
}

export default FeaturedCollections
