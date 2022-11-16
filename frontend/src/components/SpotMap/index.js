import React from "react";
import './SpotMap.css'


const SpotMap = ({spot}) => {
    let environment = 'AIzaSyBSTJdNRbbb3l-tDELReRQ0O7ibW6BUGOU'
    return (
        <iframe
            className='embed-map'
            title='location-map'
            src={`https://www.google.com/maps/embed/v1/place?key=${environment}
            &q=${spot?.city}+${spot?.state}`}>
        </iframe>
    )


}


export default SpotMap
