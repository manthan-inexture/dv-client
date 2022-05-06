import React from 'react';
import loadingGif from '../img/loading.gif';

function Loading({ loading }) {
    return (
        <div className={`preloader ${loading ? 'd-block' : 'd-none'}`}>
            <img className="loadingImage" src={loadingGif} alt='loading' />
        </div>
    )
}

export default Loading