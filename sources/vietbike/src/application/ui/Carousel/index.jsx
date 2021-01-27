import React from "react";
import PropTypes from "prop-types";

import { CarouselWrapper } from './style';
import CarouselItem from '../CarouselItem';

const Carousel = ({ station, props }) => {
    return (
        <div>
			{station.impiantoDiRiduzione.length > 0 &&
				<CarouselWrapper>
					<CarouselItem  
						station={station}
						props={props}
					/>
				</CarouselWrapper>
			}
        </div>
    );
}

Carousel.propType = {

};

Carousel.defaultProps = {

};

export default Carousel;