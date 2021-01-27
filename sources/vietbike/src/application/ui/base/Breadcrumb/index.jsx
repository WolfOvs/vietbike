import React from 'react';
import { NavLink } from 'react-router-dom';

import { WrapperBreadcrumb, DateUpdate, WrapperDetails, StateDetail } from './styles';
import Icon from '../Icon';

const Breadcrumb = ({ paths, state, time }) => {
	const implantState = Number(state);

	const getTime = (time) => {
		const date = time ? time : new Date();
		const mm = date.getMonth() + 1
		var dateFormatted = 'ore ' + date.getHours() + ':' + (date.getUTCMinutes().toString().length <= 1 ? '0' : '') + date.getUTCMinutes() + ' del '  + date.getDate() + '/' + (mm.toString().length === 1 ? '0' + mm : '') + '/' +  date.getFullYear();
		return dateFormatted;
	}

	return (
		<div>
			<WrapperBreadcrumb className="dflex dflex__center">
				<li className="dflex dflex__center"><NavLink to={'/'}>Set limiti </NavLink>  <Icon iconKey={'arrowDown'} size={30}/></li> 
				{paths.map((path, index) => 
					(index < paths.length - 1)
						? <li key={path.url} className="dflex dflex__center"><NavLink to={path.url}>{path.title} 
						</NavLink> <Icon iconKey={'arrowDown'} size={30}/> </li> 
						: <li key={path.url}> <span> {path.title}</span> </li>
				)}  
			</WrapperBreadcrumb>
			<WrapperDetails>
				<DateUpdate>Dati aggiornati alle {time ? getTime(time) : getTime()} </DateUpdate> 
				 { (implantState || implantState === 0) && <StateDetail stateColor={implantState}>Stato: <span>{ implantState === 0 ? 'Attiva' : implantState === 1 ? 'Non attiva' : 'Bypassata' }</span></StateDetail>}
			</WrapperDetails>
			
		</div>
		)
	};

export default Breadcrumb;