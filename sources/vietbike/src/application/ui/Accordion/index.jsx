import React from 'react';
import PropTypes from 'prop-types';

import {
	AccordionWrapper,
	AccordionLabel,
	AccordionContent,
	AccordionWrapperIcon
} from './style';
import { Icon } from '../base';

const Accordion = ({ children, title, iconTitle, data, iconAccordion, iconStatus, isOpen, typeStyle, cliccableAll }) => {

	const [isOpenAccordion, changeOpenAccordion] = React.useState(isOpen);

	return (
		<React.Fragment>
			<AccordionWrapper typeStyle={typeStyle}>
				<AccordionLabel
					className={'dflex dflex__center dflex__center--space-between'}
					onClick={cliccableAll ? () => changeOpenAccordion(!isOpenAccordion) : e => e.preventDefault()}
					typeStyle={typeStyle}
				>
					<div>
						{iconTitle &&
							<Icon key={iconTitle.key}
								iconKey={iconTitle.key}
								size={iconTitle.size}
								margin={'0 5px 0 0'}
							/>
						}
						{title}
					</div>
					<AccordionWrapperIcon
						className="dflex dflex__center"
						iconTransform={isOpenAccordion ? 'scaleY(-1)' : ''}
						onClick={() => changeOpenAccordion(!isOpenAccordion)}
					>
						{data && <span>{data}</span>}
						{iconStatus &&
							<Icon
								iconKey={iconStatus}
								size={16}
							/>
						}
						<Icon
							className="img-rotate"
							iconKey={iconAccordion}
							size={16}
						/>
					</AccordionWrapperIcon>
				</AccordionLabel>
			</AccordionWrapper>
			{isOpenAccordion &&
				<AccordionContent typeStyle={typeStyle} className="ul-content">
					{children}
				</AccordionContent>
			}
		</React.Fragment>
	);
}

Accordion.propTypes = {
	title: PropTypes.object,
	iconTitle: PropTypes.object,
	data: PropTypes.string,
	iconAccordion: PropTypes.string,
	isOpen: PropTypes.bool,
	typeStyle: PropTypes.string,
	cliccableAll: PropTypes.bool,
	iconStatus: PropTypes.string
};

Accordion.defaultProps = {
	title: '',
	iconTitle: null,
	data: '',
	iconAccordion: 'arrowDown',
	isOpen: true,
	typeStyle: 'accordion-blue',
	cliccableAll: true,
	iconStatus: null
};


export default Accordion;