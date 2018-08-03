import React from 'react';
import Tilt from 'react-tilt'; //see: https://www.npmjs.com/package/react-tilt
import eye from './eye.png'; //I can call it whatever (eye,eye1,eye69)...whatever
import './Icon.css'; //'./' points to current directory

const Icon = () => {
	return (
		<div className='ma4'>
			<Tilt className="Tilt set br3 shadow-2" options={{ max : 0 }} style={{ height: 130, width: 130 }} > {/*'0' for no tilt, just zoom*/}
				<div className="Tilt-inner pa2">
					<img style={{paddingTop: '25px'}} alt='logo' src={eye}></img> {/*image encased in div, which is encased in Tilt object...usage defined in link*/}
				</div>
			</Tilt>
		</div>
	);
}


export default Icon;