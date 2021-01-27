import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import {
  StationState,
  Accordion,
  MenuSidebar,
  ListAccordionMenu,
	TcsItemLink
} from "../../ui";
import {
  orderByStatus,
  getStationsByType,
	getUrlWithParimeters,
	constants
} from "../../../utils";
import { WrapperAside, UserName, Text, Options } from './style';
import SnamLogo from '../../ui/base/SnamLogo';
import Icon from '../../ui/base/Icon';

const Sidebar = ({
  stations,
  pathsMenu,
  accordionMenu,
  stationActive,
  tcsActive,
	pageCurrent,
	isOpen,
  onCloseMenu,
  onClickLogo,
  ridp
}) => {
	
  const stationSpinta = stations ? getStationsByType(stations, 0) : [];
  const stationStoccaggio = stations ? getStationsByType(stations, 1) : [];
  const stationSpintaOrdering = orderByStatus(stationSpinta);
	const stationStoccaggioOrdering = orderByStatus(stationStoccaggio);

  return (
    <WrapperAside side={"left"}>              
          <SnamLogo size={50} onClickLogo={onClickLogo}/>
          <Options>
            <Icon iconKey={'iconOptions'} size={40} />
          </Options>
          <UserName>
            <Icon iconKey={'iconUser'} size={30} />
            <Text>{ridp}</Text>
          </UserName>
    </WrapperAside>
  );
};

const findTcs = (tcs, idTcs) => {
  return tcs.findIndex(tc => parseInt(tc.id) === parseInt(idTcs)) >= 0
    ? true
    : false;
};

/**
 * Function to add or remove highlight in the markers in the map
 * It works only when we are in the home
 * @param {*} station
 * @param {*} hoverValue
 * @param {*} pageCurrent
 */
const someHandler = (station, hoverValue) => {
    const icon = document.querySelector(`img[stationid="${station.id}"]`);
    if (icon) {
      if (hoverValue) {
        icon.classList.add("highlight");
        switch (station.type) {
          case 1:
            icon.classList.add("blue");
						break;
					default:
            icon.classList.add("green");
            break;
        }
      } else {
        icon.classList.remove("highlight");
      }
    }
};

const getUrlTcs = (pageCurrent, idStation, idTcsActive, tcs) => {
  if (idTcsActive) {
    return tcs.map(tc => {
      const url = getUrlWithParimeters(pageCurrent.path, [
        { key: `:id(${constants.stationsParam})`, value: idStation },
				{ key: `:idtcs(${constants.turbochangerParam})`, value: tc.id },
				{ key: ":tab", value: pageCurrent.params.tab }
      ]);
      return { key: tc.id, url: url };
    });
  } else {
    return tcs.map(tc => ({
      key: tc.id,
      url: `/panoramicaStazione/${idStation}/panoramicaTCS/${tc.id}`
    }));
  }
};

const getStationList = (
  stations = [],
  idStationActive,
  idTcsActive,
	pageCurrent,
	onCloseMenu
) => {
  return stations.map(station => {
		const iconStatus = station.old ? 'timer' : null;
		const isHome = pageCurrent.path === '/';
		let url = `/panoramicaStazione/${station.id}`;
		const urlStation = pageCurrent.path.split('/')
		if(urlStation[3] === 'avvisi' || urlStation[3] === 'trend') {
			urlStation[2] = station.id;
			url = urlStation.join('/');
		}
    const LabelStation = (
      <StationState
        key={station.id}
        station={station}
				isActiveHandler={isHome}
				pageCurrent={pageCurrent}
        someHandler={(station, hoverValue) => {
          someHandler(station, hoverValue);
				}}
				url={url}
				onCloseMenu={onCloseMenu}
      />
    );
    const urls = getUrlTcs(
      pageCurrent,
      station.id,
      idTcsActive,
      station.data.tcs
    );
    const listTcs = station.data.tcs.map(tc => (
      <TcsItemLink
				keyTcs={`${station.id} - ${tc.id}`}
				key={`${station.id} - ${tc.id}`}
        url={urls.find(el => el.key === tc.id).url}
        tc={tc}
        active={
          parseInt(station.id) === parseInt(idStationActive) &&
          parseInt(tc.id) === parseInt(idTcsActive)
				}
				onCloseMenu={onCloseMenu}
      />
    ));
    return (
      <Accordion
        key={station.id}
				title={LabelStation}
				typeStyle={'third-level'}
        isOpen={
          parseInt(station.id) === parseInt(idStationActive)
            ? findTcs(station.data.tcs, idTcsActive)
            : false
					}
				iconStatus = {iconStatus}
        iconAccordion={"arrowDown"}
        cliccableAll={false}
      >
        <ListAccordionMenu listItem={listTcs} paddingLink={'0 0 0 67px'}/>
      </Accordion>
    );
  });
};

Sidebar.propTypes = {
  stations: PropTypes.array,
  side: PropTypes.string,
  pathsMenu: PropTypes.array,
  stationActive: PropTypes.string,
  tcsActive: PropTypes.string,
  pageCurrent: PropTypes.object,
  accordionMenu: PropTypes.array
};

Sidebar.defaultProps = {
  stations: [],
  side: "left",
  pathsMenu: null,
  stationActive: "",
  tcsActive: "",
  pageCurrent: {},
  accordionMenu: []
};

export default withRouter(Sidebar);
