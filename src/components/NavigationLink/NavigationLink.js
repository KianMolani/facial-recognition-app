import React from 'react';

const NavigationLink = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}> {/*see https://css-tricks.com/snippets/css/a-guide-to-flexbox/ */}
				<p onClick={() => onRouteChange('signin')} className='f3 moon-gray link dim ba b--mid-gray bw1 br3 mr3 shadow-2 pa3 pointer'> Sign Out </p> {/*see http://tachyons.io/*/}
			</nav>
		);
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}> {/*see https://css-tricks.com/snippets/css/a-guide-to-flexbox/ */}
				<p onClick={() => onRouteChange('signin')} className='f3 moon-gray link dim ba b--mid-gray bw1 br3 mr3 shadow-2 pa3 pointer'> Sign In </p> {/*see http://tachyons.io/*/}
				<p onClick={() => onRouteChange('register')} className='f3 moon-gray link dim ba b--mid-gray bw1 br3 mr3 shadow-2 pa3 pointer'> Register </p> {/*see http://tachyons.io/*/}
			</nav>
		);
	}
}

export default NavigationLink;