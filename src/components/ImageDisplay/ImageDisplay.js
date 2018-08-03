import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({imageUrl, box}) => {
	return (
		<div className='center ma'>
			<div className = 'absolute mt2'>
				<img id = 'inputImage' alt='logo' src={imageUrl} width='500px' height='auto'/>
				<div className='bounding-box' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow,left:box.leftCol}}></div> {/*resolved from analyzing html source from clarifai website*/}
			</div>
		</div> 
	);
}

export default ImageDisplay;