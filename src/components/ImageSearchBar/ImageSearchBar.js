import React from 'react';
import './ImageSearchBar.css';

const ImageSearchBar = ({ onInputChange, onImageSubmit }) => { {/*destructuring, instead of doing props. in body*/}
	return (
		<div>
			<p className='f4'> {'Enter a link to your image below, and Eva will work her magic!'} </p>
			<div className='center'>
				<div className='form center'> {/*form defines with of button and input bar together*/}
					<input className='f4 pa2 w-70 center' type='text'onChange={onInputChange}/> {/*execute parameter (passed method) when input element changes value (the event is passed...learn more)*/}
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-gray' onClick={onImageSubmit}>Detect</button> {/*button constitutes 30% of total width*/}
				</div>
			</div>
		</div>
	);
}

export default ImageSearchBar;