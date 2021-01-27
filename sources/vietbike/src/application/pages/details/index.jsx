import React from "react";
import { connect } from "react-redux";
import { getStationsList } from "../../../redux/actions/stations";
import { getSetLimiti } from '../../../redux/actions/limiti';
import { getChartDetails } from '../../../redux/actions/chartDetails';

import {
    Wrapper,
    WrapperLayout,
    WrapperSidebar,
    WrapperDetails,
    Header,
    ArrowWrapper,
    Text,
    CardsWrapper,
    ChartWrapper,
    Title,
    Chart,
    Body
} from './style';
import { Sidebar } from "../../components";
import { Breadcrumb, ArrowButton, Card } from "../../ui/base";
import { ChartSettings, Modal, CartesianUITrends } from "../../ui";
import { colorsUOM, findTooltipLabel, getUomByTag, getLabelbyTagAcn } from "../../../utils";

function Details(props) {
    const { stations, match, dispatchSetLimiti, setLimiti, dispatchGetStationsList, updatedStations, dispatchChartDetails, firstChartData, secondChartData, history, token } = props;

    const idCabine = (history.location.pathname.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g) || []).map(function (v) { return +v; }).pop();
    const [stationsUpdate, setStationsUpdate] = React.useState(updatedStations);
    const [activeIndex, changeActiveIndex] = React.useState(idCabine - 1);
    const [showLimitModal, toggleShowLimitModal] = React.useState(false);
    const [setLimitiInfo, changesetLimitiInfo] = React.useState({});
    const [confirmLimits, setConfirmLimits] = React.useState(false);
    const [confirmLimitsFeedback, changeConfirmLimitsFeedback] = React.useState({});

    const [firstChartDate, setFirstChartDate] = React.useState({
        dateFrom: new Date().setMonth(new Date().getMonth() - 1),
        dateTo: new Date().getTime()
    });
    const [secondChartDate, setSecondChartDate] = React.useState({
        dateFrom: new Date().setMonth(new Date().getMonth() - 1),
        dateTo: new Date().getTime()
    });
    const [filtersUpdate, setFiltersUpdate] = React.useState(false);
    const [filtersFirstChart, setFiltersFirstChart] = React.useState(null);
    const [filtersSecondChart, setFiltersSecondChart] = React.useState(null);
    const [zoomAreaFirst, setZoomAreaFirst] = React.useState(false);
    const [zoomAreaSecond, setZoomAreaSecond] = React.useState(false);

    //const dataTrend = require('./data2.json');
    const [dataTrendFirstChart, setDataTrendFirstChart] = React.useState(null);
    const [dataTrendSecondChart, setDataTrendSecondChart] = React.useState(null);
    const [firstChart, changeFirstChart] = React.useState(null);
    const [secondChart, changeSecondChart] = React.useState(null);

    const [firstDomainY, changeFirstDomainY] = React.useState([{ uom: '-', label: '-', domain: [0, 10] }]);
    const [firstDomainX, changeFirstDomainX] = React.useState([new Date(new Date().setHours(new Date().getHours() - 1)), new Date()]);
    const [secondDomainY, changeSecondDomainY] = React.useState([{ uom: '-', label: '-', domain: [0, 10] }]);
    const [secondDomainX, changeSecondDomainX] = React.useState([new Date(new Date().setHours(new Date().getHours() - 1)), new Date()]);
    const [dataListTags, changeDataListTags] = React.useState([]);
    const [update, setUpdate] = React.useState(null);
    const [chartFiltered, setChartFiltered] = React.useState(false);
	const [ridp, setRidp] = React.useState(props.location.ridp ? props.location.ridp : localStorage.getItem('RIDP'));
    const tokenAD = localStorage.getItem('token');

    if(props.location.ridp) {
		localStorage.setItem('RIDP', props.location.ridp);
	}

    React.useEffect(() => {
        let localRidp = localStorage.getItem('RIDP');

		if(!localRidp) {
			// props.history.push('/');
		}
	}, [ridp])

    if (!history.location.stationData) {
        var url = history.location.pathname;

        const id = history.location.pathname.substring(
            history.location.pathname.lastIndexOf("id=") + 1,
            history.location.pathname.lastIndexOf("/")
        );
        const idFinal = id.substring(2);
        let obj = stations.find(o => o.id === idFinal);
        history.location.stationData = obj;
    }

    const [length] = React.useState(history.location.stationData.impiantoDiRiduzione.length);

    let station = history.location.stationData;
    let cabina = station.impiantoDiRiduzione[activeIndex];

    const generateYDomain = (currentChart) => {
        const valuesY = currentChart.map(el => el.values.map(el => Number(el.y))).filter(el => el.length > 0);
        let maxValuesY = valuesY.map(element => Math.max(...element));
        let minValuesY = valuesY.map(element => Math.min(...element));
        const maxValueY = Math.max(...maxValuesY);
        const minValueY = Math.min(...minValuesY);
        if (Math.abs(minValueY) !== Infinity && Math.abs(maxValueY) !== Infinity) {
            return [minValueY, maxValueY];
        }
        return [0, 10];
    };

    const formatDate = (date, to) => {
        const el = new Date(date);
        let month = to === "toDDMMYYY+1" ? (el.getMonth() + 1) : el.getMonth();
        month = month < 10 ? ("0" + month) : month;
        switch (to) {
            case "toDDMMYYY+1":
                return el.getDate() + "-" + month + "-" + el.getFullYear();
            case "toDDMMYYY":
                return el.getDate() + "-" + month + "-" + el.getFullYear();
        }

    }

    const splitChartDataY = React.useCallback((currentChart) => {
        const newCurrentChart = currentChart.map(curve => {
            //curve.uom = curve.name.split('_')[2];
            return curve;
        });
        const arrayUom = [...new Set(newCurrentChart.map(el => el.uom))];
        const domain = [];
        arrayUom.forEach(uom => {
            domain.push({ uom: uom, label: getUomByTag(uom), domain: generateYDomain(newCurrentChart.filter(chart => chart.uom === uom)) })
        });
        return {
            domain,
            newCurrentChart
        }
    }, []);

    React.useEffect(() => {
        if (filtersUpdate) {
            setFiltersUpdate(false);
        }
    }, [filtersUpdate])

    let itemsTable = [];

    const getChart = (item, trend) => {
        let filteredCharts = [];
        if (item) {
            item.forEach((el) => {
                if(el.checked) {
                    setChartFiltered(true);
                    trend.chart.forEach((chart) => {
                        if(el.value === chart.name) {     
                            filteredCharts.push(chart);
                        }
                    })
                } else {
                    setChartFiltered(false);
                }
            })
        }
        return item && filteredCharts ? [...filteredCharts] : trend && trend.chart ? [...trend.chart] : [];
    }

    const getDataDetails = (start, end) => {
        dispatchChartDetails({
            areaImpiantistica: station.id,
            codiceImpianto: cabina.name,
            startDate: formatDate(start, "toDDMMYYY+1"),
            endDate: formatDate(end, "toDDMMYYY+1")
        }, tokenAD);
    } 

    const setDomain = (dataTrend, changeDomainY, changeDomainX) => {
        const dataFrom = dataTrend && dataTrend.dateFrom ? new Date(dataTrend.dateFrom) : new Date(new Date().setHours(new Date().getHours() - 1))
        const dateTo = dataTrend && dataTrend.dateTo ? new Date(dataTrend.dateTo) : new Date();
        if (dataTrend.chart) {
            const { domain } = splitChartDataY(dataTrend.chart);
            changeDomainY(domain);
        }
        changeDomainX([dataFrom, dateTo]);
    }

    const getChartsParameters = (trend, chart) => {
        trend.listParameters.forEach((item, index) => {
            const element = getLabelbyTagAcn(dataListTags, item.tag);
            const color = colorsUOM(item.uom, index);

            const elementChart = chart.find(el => el.name.split('_')[1] === item.tag);
            itemsTable.push({ tag: item.tag, color: color, label: element.label, uom: item.uom });
            if (elementChart) {
                elementChart['color'] = color;
            }
        })
    }

    const setChart = (dataTrendChart, changeDomainY, changeDomainX, filtersChart, chart, changeChart) => {
        setDomain(dataTrendChart, changeDomainY, changeDomainX);
        changeChart(getChart(filtersChart, dataTrendChart));
        if (chart) {
            getChartsParameters(dataTrendChart, chart);
        }
    }

    const resetStates = () => {
        changesetLimitiInfo({});
        setConfirmLimits(false);
        changeConfirmLimitsFeedback({});
        setFirstChartDate({ dateFrom: new Date().setMonth(new Date().getMonth() - 1), dateTo: new Date().getTime() });
        setSecondChartDate({ dateFrom: new Date().setMonth(new Date().getMonth() - 1), dateTo: new Date().getTime() });
        setFiltersUpdate(false);
        setFiltersFirstChart(null);
        setFiltersSecondChart(null);
        setZoomAreaFirst(false);
        setZoomAreaSecond(false);
        setDataTrendFirstChart(null);
        setDataTrendSecondChart(null);
        changeFirstChart(null);
        changeSecondChart(null);
        changeFirstDomainY([{ uom: '-', label: '-', domain: [0, 10] }]);
        changeFirstDomainX([new Date(new Date().setHours(new Date().getHours() - 1)), new Date()]);
        changeSecondDomainY([{ uom: '-', label: '-', domain: [0, 10] }]);
        changeSecondDomainX([new Date(new Date().setHours(new Date().getHours() - 1)), new Date()]);
        changeDataListTags([]);
        setUpdate(null);
    }

    const updateAll = () => {
        resetStates();

        const start = new Date().setMonth(new Date().getMonth() - 1);
        const end = new Date().getTime();

        getDataDetails(start, end);
        setUpdate(3);
    }

    const checkDataUpdate = () => {
        if (firstChartData !== dataTrendFirstChart) {
            setDataTrendFirstChart(firstChartData);
            setDataTrendSecondChart(secondChartData);
            setUpdate(null);
        }
    }

    const updateSingleChart = (chartDate, setChartDate, dataTrendChart, chartData, setDataTrendChart) => {
        if (chartDate.dateFrom) {
            getDataDetails(chartDate.dateFrom, chartDate.dateTo);
            setChartDate({ dateFrom: "", dateTo: "" });
            setZoomAreaFirst(false);
            setZoomAreaSecond(false);
        } else {
            if (dataTrendChart !== chartData) {
                setDataTrendChart(chartData);
                setUpdate(null);
            }
        }
    }

    React.useEffect(() => {
        if (!dataTrendFirstChart) {
            updateAll();
            if (firstChartData) {
                setDataTrendFirstChart(firstChartData);
                setDataTrendSecondChart(secondChartData);
            }
        } else {
            setChart(dataTrendFirstChart, changeFirstDomainY, changeFirstDomainX, filtersFirstChart, firstChart, changeFirstChart);
            setChart(dataTrendSecondChart, changeSecondDomainY, changeSecondDomainX, filtersSecondChart, secondChart, changeSecondChart);
        }
    }, [dispatchChartDetails, firstChartData, secondChartData, dataTrendFirstChart, dataTrendSecondChart]);

    React.useEffect(() => {
        if (update === 1) {
            updateSingleChart(firstChartDate, setFirstChartDate, dataTrendFirstChart, firstChartData, setDataTrendFirstChart);
        } else if (update === 2) {
            updateSingleChart(secondChartDate, setSecondChartDate, dataTrendSecondChart, secondChartData, setDataTrendSecondChart);
        } else if (update === 3) {
            checkDataUpdate();
        }
    }, [update, firstChartData, secondChartData])

    React.useEffect(() => {
        if (filtersFirstChart && filtersUpdate) {
            setChart(dataTrendFirstChart, changeFirstDomainY, changeFirstDomainX, filtersFirstChart, firstChart, changeFirstChart);
        }
        if (filtersSecondChart && filtersUpdate) {
            setChart(dataTrendSecondChart, changeSecondDomainY, changeSecondDomainX, filtersSecondChart, secondChart, changeSecondChart);
        }
    }, [filtersFirstChart, filtersSecondChart, filtersUpdate])

    const id = Date.now();

    const goToPrevSlide = () => {
        let index = activeIndex;
        let lengthValue = length;
        if (index < 1) {
            index = lengthValue - 1;
        } else {
            index--;
        }
        changeActiveIndex(index);
        resetStates();
    }

    const goToNextSlide = () => {
        let index = activeIndex;
        let lengthValue = length;
        if (index === lengthValue - 1) {
            index = 0
        } else {
            index++;
        }
        changeActiveIndex(index);
        resetStates();
    }

    const checkConfirmLimits = () => {
		if(setLimiti === 'OK') {
			toggleShowLimitModal(false);
			changesetLimitiInfo({});
            dispatchGetStationsList(ridp, tokenAD);
            //cabina.limiteConsigliato = null;
            resetStates();
		}else if(setLimiti === 'KO'){
			let feedback = {
				name: setLimitiInfo.name,
				id: setLimitiInfo.id,
				status: setLimiti
			}
			changeConfirmLimitsFeedback(feedback);
			const timer = setTimeout(() => {
				changeConfirmLimitsFeedback({});
				}, 5000);
			return () => clearTimeout(timer);
		}
	}


	React.useEffect(() => {
		if(confirmLimits) {
			dispatchSetLimiti({ 
				idMisuratore: setLimitiInfo.idMisuratore,
				accettaLimiti: setLimitiInfo.confirmed,
				noteLimiti: setLimitiInfo.note ? setLimitiInfo.note : ''
			}, tokenAD);
			setConfirmLimits(false);
		}else {
			if(setLimiti) {
				checkConfirmLimits();
			}
		}
		
	}, [setLimiti, confirmLimits,  dispatchSetLimiti, dispatchGetStationsList]);

    const setLimitsModal = (cabin, stationName, state) => {
        const details = {
            name: stationName,
            cabin: cabin.name,
            date: cabin.limitDate,
            id: cabin.id,
            idMisuratore: cabin.idMisuratore,
            confirmed: state,
            note: ''
        }
        changesetLimitiInfo(details);
        if (details.confirmed === 'NO') {
            toggleShowLimitModal(true);
        } else {
            setConfirmLimits(true);
        }

    }

    const getNotification = (station, cabin) => {
        if(stationsUpdate) {
            station = stationsUpdate.find((el) => {
                return station.id === el.id;
            })
            cabin = station.impiantoDiRiduzione[activeIndex];
        }
        return (station.notification && cabin.limiteConsigliato > 0 && station.state != 1);
    }

    const getCheckboxFilters = (stationType, chart) => {
        if (chart === 1) {
            if (!filtersFirstChart) {
                switch (stationType) {
                    case 0:
                        return [{
                            id: '1',
                            name: 'Portata',
                            value: 'Portata',
                            checked: true,
                            color: '#596bee',
                            action: (item) => { return !item }
                        },
                        {
                            id: '2',
                            name: 'Limiti',
                            value: 'LimitiAttuali',
                            checked: true,
                            color: '#ee7c59',
                            action: (item) => { return !item }
                        },
                        {
                            id: '3',
                            name: 'AI Tips',
                            value: 'LimitiSuggeriti',
                            checked: true,
                            color: '#00d183',
                            action: (item) => { return !item }
                        }];
                    case 1:
                        return [{
                            id: '1',
                            name: 'Nomine',
                            value: 'Nomina',
                            checked: true,
                            color: '#ee598b',
                            action: (item) => { return !item }
                        },
                        {
                            id: '2',
                            name: 'Portata',
                            value: 'Portata',
                            checked: true,
                            color: '#596bee',
                            action: (item) => { return !item }
                        },
                        {
                            id: '3',
                            name: 'Limiti',
                            value: 'LimitiAttuali',
                            checked: true,
                            color: '#ee7c59',
                            action: (item) => { return !item }
                        }];
                }
            } else {
                return filtersFirstChart;
            }
        } else if (chart === 2) {
            if (!filtersSecondChart) {
                switch (stationType) {
                    case 0:
                        return [{
                            id: '4',
                            name: 'Pressione Monte',
                            value: 'PressioneMonte',
                            checked: true,
                            color: '#59deee',
                            action: (item) => { return !item }
                        },
                        {
                            id: '5',
                            name: 'Pressione Valle',
                            value: 'PressioneValle',
                            checked: true,
                            color: '#016ee5',
                            action: (item) => { return !item }
                        }];

                    case 1:
                        return [{
                            id: '4',
                            name: 'Pressione Valle',
                            value: 'PressioneValle',
                            checked: true,
                            color: '#016ee5',
                            action: (item) => { return !item }
                        }];
                }
            } else {
                return filtersSecondChart;
            }
        }
    }

    React.useEffect(() => {
        if (updatedStations) {
            setStationsUpdate(updatedStations);
        }

    }, [dispatchGetStationsList, updatedStations]);

    return (
        <Wrapper>
            <WrapperLayout>
                <WrapperSidebar>
                    <Sidebar
                        ridp={ridp}
						onClickLogo={() => history.push('/')}
                    />
                </WrapperSidebar>
                <WrapperDetails>
                    <Header>
                        <Breadcrumb paths={station.type !== 1 ? [
                            {
                                key: 'Mappa Toscana',
                                title: 'Mappa Toscana',
                                url: '/'
                            },
                            {
                                key: 'Stazione',
                                title: station.name.toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase()).replace(/(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$|^\d/g, x => x.toUpperCase()),
                                url: match.url
                            },
                            {
                                key: 'Cabina',
                                title: 'CAB ' + cabina.name,
                                url: '#'
                            }] :
                            [{
                                key: 'Mappa Toscana',
                                title: 'Mappa Toscana',
                                url: '/'
                            },
                            {
                                key: 'Stazione',
                                title: station.name.toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase()).replace(/(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$|^\d/g, x => x.toUpperCase()),
                                url: match.url
                            }]
                        }
                            state={station.state}
                            time={history.location.updateTime}
                        />
                        <ArrowWrapper>
                            <Text>{activeIndex + 1} / {length} </Text>
                            <ArrowButton
                                icon={'iconArrowBack'}
                                size={25}
                                action={goToPrevSlide}
                                inactive={(length <= 1)} />
                            <ArrowButton
                                icon={'iconArrowForward'}
                                size={25}
                                action={goToNextSlide}
                                inactive={(length <= 1)} />
                        </ArrowWrapper>
                    </Header>
                    <Body>
                        <CardsWrapper>
                            {station.type !== 1 && <Card title={'Pressione Monte'} value={cabina.pressioneIN} />}
                            <Card title={'Pressione Valle'} value={cabina.pressioneOUT} />
                            {station.type === 1 && <Card title={'Nomina G/G MAX'} value={station.valoreNomina} />}
                            <Card title={'Portata'} value={cabina.portata} />
                            <Card title={'Limite'} value={cabina.limite} />
                            {getNotification(station, cabina) &&
                                <Card
                                    title={'Limite consigliato HH'}
                                    value={cabina}
                                    stationName={station.name}
                                    actionLimitModal={setLimitsModal}
                                    confirmLimits={confirmLimitsFeedback}
                                    confirmLimitsAction={changeConfirmLimitsFeedback}
                                />}
                        </CardsWrapper>
                        <Modal
                            showModal={showLimitModal}
                            onClose={() => toggleShowLimitModal(false)}
                            maxWidth={'680px'}
                            setLimiti={setLimitiInfo}
                            setLimitiAction={setConfirmLimits}
                            changesetLimiti={changesetLimitiInfo}
                            confirmLimits={confirmLimitsFeedback}
                            confirmLimitsAction={changeConfirmLimitsFeedback}
                        />
                        <ChartWrapper>
                            {station.type === 1 && <Title> NOMINE / PORTATE / LIMITI</Title>}
                            {station.type !== 1 && <Title> PORTATE / LIMITI / LIMITI CONSIGLIATI</Title>}
                            {dataTrendFirstChart && <ChartSettings
                                classStyle=""
                                padding={'15px 0'}
                                filters={{
                                    dateFrom: dataTrendFirstChart.dateFrom ? dataTrendFirstChart.dateFrom : firstChartDate.dateFrom,
                                    dateTo: dataTrendFirstChart.dateTo ? dataTrendFirstChart.dateTo : firstChartDate.dateTo,
                                    checkbox: getCheckboxFilters(station.type, 1)
                                }}
                                changeDateFilters={setFirstChartDate}
                                changeCheckboxFilters={setFiltersFirstChart}
                                updateDate={() => setUpdate(1)}
                                update={filtersUpdate}
                                updateAction={setFiltersUpdate}
                                zoom={zoomAreaFirst}
                                zoomAction={() => { setZoomAreaFirst(!zoomAreaFirst) }}
                            />}
                            <Chart>
                                {firstChart && <CartesianUITrends
                                    zoomActive={zoomAreaFirst}
                                    onChangeZoomActive={() => { setZoomAreaFirst(false) }}
                                    //commentsActive={commentsActive}
                                    chartFiltered={chartFiltered}
                                    idSelector={`#cartesian-trend-modal-BO-3-1586551935`}
                                    data={firstChart}
                                    height={222}
                                    xDomain={firstDomainX}
                                    yDomain={firstDomainY}
                                    xLabel={'t'}
                                    xUnit={'t'}
                                    margin={{ top: 32, right: 32, bottom: 20, left: 20 }}
                                    colors={colorsUOM}
                                    //sliders={trendFirstChart.sliders}
                                    findTooltipLabel={(tag) => findTooltipLabel(dataListTags, tag)}
                                />}
                            </Chart>
                        </ChartWrapper>

                        <ChartWrapper>
                            {station.type !== 0 && <Title>PRESSIONE VALLE</Title>}
                            {station.type === 0 && <Title>PRESSIONI MONTE &amp; VALLE</Title>}
                            {dataTrendSecondChart && <ChartSettings
                                classStyle=""
                                padding={'15px 0'}
                                filters={{
                                    dateFrom: dataTrendSecondChart.dateFrom ? dataTrendSecondChart.dateFrom : secondChartDate.dateFrom,
                                    dateTo: dataTrendSecondChart.dateTo ? dataTrendSecondChart.dateTo : secondChartDate.dateTo,
                                    checkbox: getCheckboxFilters(station.type, 2)
                                }}
                                changeDateFilters={setSecondChartDate}
                                changeCheckboxFilters={setFiltersSecondChart}
                                updateDate={() => setUpdate(2)}
                                update={filtersUpdate}
                                updateAction={setFiltersUpdate}
                                zoom={zoomAreaSecond}
                                zoomAction={() => { setZoomAreaSecond(!zoomAreaSecond) }}
                            />}
                            <Chart>
                                {secondChart && <CartesianUITrends
                                    zoomActive={zoomAreaSecond}
                                    onChangeZoomActive={() => { setZoomAreaSecond(false) }}
                                    idSelector={`#cartesian-trend-modal-BO-3-1586551934`}
                                    data={secondChart}
                                    height={222}
                                    xDomain={secondDomainX}
                                    yDomain={secondDomainY}
                                    xLabel={'t'}
                                    xUnit={'t'}
                                    margin={{ top: 32, right: 32, bottom: 20, left: 20 }}
                                    colors={colorsUOM}
                                    //sliders={trendSecondChart.sliders}
                                    findTooltipLabel={(tag) => findTooltipLabel(dataListTags, tag)}
                                />}
                            </Chart>
                        </ChartWrapper>
                    </Body>
                </WrapperDetails>
            </WrapperLayout>
        </Wrapper>

    );
}

Details.propType = {

};

Details.defaultProps = {

};

export default connect(
    state => {
        return {
            //stations: state.stationsList.stations,
            setLimiti: state.limiti.setLimiti,
            updatedStations: state.stationsList.stations,
            firstChartData: state.chartDetails.firstChartData,
            secondChartData: state.chartDetails.secondChartData,
		};
	},
	dispatch => {
		return {
            dispatchGetStationsList: (clientId, tokenAD) => dispatch(getStationsList(clientId, tokenAD)),
            dispatchSetLimiti: (limitInfo, tokenAD) => dispatch(getSetLimiti(limitInfo, tokenAD)),
            dispatchChartDetails: (options, tokenAD) => dispatch(getChartDetails(options, tokenAD)),
		};
	}
)(Details);