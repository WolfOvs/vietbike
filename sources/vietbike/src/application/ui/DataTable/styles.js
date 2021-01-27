import styled from 'styled-components';


const TableWrapper = styled.div`
  margin: 20px 16px;
	position:relative;
	background-color: ${props => props.theme.colors.colorTarawera};
	border-radius: 5px 5px 0 0;
	height: 100vh;
	overflow: hidden;
	border: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.2})};
`;

const DataTableWrapper = styled.table`
  color: ${props => props.theme.colors.white};
  width: 100%;
  border-spacing: 0px;
	border-collapse: collapse;
	thead, tbody tr {
		box-sizing: border-box;
		display: table;
		width: 100%;
		table-layout: fixed;
	}
	tr:nth-child(1) {
    margin-top: 0px;
	}
	td { 
		box-sizing: border-box;
	}
`;

const TableHeader = styled.thead`
	position: relative;
  background-color: ${props => props.theme.colors.colorChambray};
  height:40px;
	border-radius: 5px 5px 0 0;
	th {
		box-sizing: border-box;
		position: relative;
		padding: 0 6px;
		font-weight:500;
		border-left: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.2})};
		text-align: left;
		z-index: ${props => props.theme.zIndex.xs};
		span {
			position:absolute;
			right:5px;
			top:17px;
		}

		&.date-head {
			width: 110px;
		}

		&.time-head {
			width: 110px;
		}

		&.duration-head {
			width: 120px;
		}

		&.code-head {
			width: 140px;
		}

		&.sistem-head {
			width: 100px;
		}

		&.type-head {
			width: 85px;
		}

		&.status-head {
			width: 85px;
		}
	
		.toggle-menu {
			display:block;
			width: 15px;
			height:20px;
			position:absolute;
			top:12px;
			right:5px;
			z-index: ${props => props.theme.zIndex.xs};
			cursor: pointer;
	
			&.checked {
				&:before {
					content:'';
					width:7px;
					height:7px;
					display:block;
					border-radius:100%;
					background-color: ${props => props.theme.colors.colorSummerSky};
					border:1px solid ${props => props.theme.colors.white};
					margin-top: -6px;
					margin-left: 8px;
				}
			}
		}
	
		&:first-child {
			border-left: none;
		}
	
		&.open-filter {
			background-color: ${props => props.theme.colors.colorTarawera};
			.checked {
				&:before {
					display:none;
				}
			}
		}
	
		span {
			font-size:10px;
			color: ${props => props.theme.colors.colorPoloBlue}; 
		}
	
		.filter-wrapper {
			display:none; 

			&.duration-head {
				width: 120px;
			}
	
			&.code-head {
				width: 170px;
			}
	
			&.sistem-head {
				width: 130px;
			}
	
			&.type-head {
				width: 115px;
			}

			&.desc-head {	
				width: calc(100% + 35px);
			}
	
			&.status-head {
				width: 110px;

				li:nth-child(1) {
					border-top: none;
				}
			}

			ul {
				max-height: 205px;
    		overflow: auto;
			}
		}
	
		&.open-filter {
			.filter-wrapper {
				display: block;
			}
			.hamburger {
				height: 0px;
			}
			.hamburger:before {
				width: 15px;
				height: 2px;
				margin-left: -2px;
				transform: rotate(140deg);
			}
			.hamburger:after {
				width: 15px;
				height: 2px;
				margin-top: -2px;
				margin-left: -2px;
				transform: rotate(45deg);
			}
		}
	
		.hamburger {
			display:block;
			background-color: ${props => props.theme.colors.white}; 
			width: 15px;
			height:2px;
			position:absolute;
			top: 35%;
			right:5px;
			cursor: pointer;
	
			&:before {
				content:'';
				display:block;
				background-color: ${props => props.theme.colors.white}; 
				width: 10px;
				height:2px;
				margin-top: 5px;
				margin-left: 2.5px; 
			}
	
			&:after {
				content:'';
				display:block;
				background-color: ${props => props.theme.colors.white}; 
				width: 5px;
				height: 2px;
				margin-top: 3px;
				margin-left: 5px; 
			}
		}
	}
`;

const TableBody = styled.tbody`
	display: block;
	position: relative;
	overflow-y: auto;
	overflow-x: hidden;
	max-height: calc(100vh - 252px);
	&::-webkit-scrollbar {
		width: 0em;
	}
	tr {
		border-bottom: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.2})};
		&:last-child {
			margin-bottom: 2px;
		}
		&.alarm {
			border-bottom: 1px solid ${props => props.theme.colors.persianRed};
			border-top: solid 1px ${props => props.theme.colors.persianRed};
			td {
				background-color: ${props => props.theme.colors.colorTransparent({r: 215, g: 53, b:48, a: 0.1})};
				&:first-of-type {
					border-left: solid 1px ${props => props.theme.colors.persianRed};
				}
				&:last-of-type {
					border-right: solid 1px ${props => props.theme.colors.persianRed};
				}
			}
			.status {
				color: #ff7a76;
			}
		}
		td {
			position: relative;
			text-align: left;
			padding: 10px;
			border-left: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.2})};

			&.date-head {
				width: 110px;
			}
	
			&.time-head {
				width: 110px;

				span {
					font-size:0.8em;
					opacity: 0.6;
				}
			}
	
			&.duration-head {
				width: 120px;
				text-align:right;
			}
	
			&.code-head {
				width: 140px;
			}
	
			&.sistem-head {
				width: 100px;
			}
	
			&.type-head {
				width: 85px;
			}
	
			&.status-head {
				width: 85px;
			}

			&.status {
				text-transform: uppercase;
			}
			
			&:first-child {
				border-left: none;
			}

		}
	}
`;

const FilterWrapper = styled.div`
  display: inline-block;
  position: absolute;
  right: -1px;
	top: 100%;
	z-index: ${props => props.theme.zIndex.xs};
	background-color: ${props => props.theme.colors.colorTarawera};
	border-left: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.2})};
	border-right: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.2})};
	border-bottom: 1px solid ${props => props.theme.colors.colorTransparent({a: 0.2})};
	border-radius: 0 0 5px 5px;

  ul {
    li {
      height:auto;
      border-top: solid 1px ${props => props.theme.colors.colorTransparent({a: 0.2})};
      padding-left: 5px;
			line-height: 20px;
			display: flex;
			align-items: center;
			label {
				width:90%;
			}
			&.hidden {
				display: none;
			}
    }
  }
`;

const UpdateLayer = styled.div`
  width: 100%;
  opacity: 0.9;
  background-color: ${props => props.theme.colors.blueWhale};
  font-size: 1.8em;
  color: ${props => props.theme.colors.white};
  text-align: center;
  position: absolute;
	top: 40px;
	left: 0;
	height: 100%;
	justify-content: center;
  align-items: center;
  span {
    text-transform: uppercase;
    width: 310px;
    display: block;
  }
}
`;

export {
	DataTableWrapper,
	TableHeader,
	TableBody,
	TableWrapper,
	FilterWrapper,
	UpdateLayer
};
