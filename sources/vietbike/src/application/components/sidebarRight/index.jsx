import React from "react";

import {
  ListParameters,
  Tooltip,
  Accordion,
  BoxWithTooltiop,
  Button,
  SetLimiti
} from "../../ui";
import { isEqualToObject } from '../../../utils';
import { WrapperAside, WrapperHeader, Title, Subtitle, Message, NotificationNumber, TimeLabel, NotificationContainer, NotificationCard,
  Header, LimitiContainer, Name, NotificationCardContainer, CabinName } from './style';

const SidebarRight = ({ action, stations, notificationCount, showModalAction, confirmLimits, confirmLimitsAction }) => {

  let haveNotifications = null;
  //let notificationCount = null;

  stations.forEach((element) => {
    if (element.impiantoDiRiduzione.some(el => el.limiteConsigliato)) {
      haveNotifications = true;
    }

    // if (element.notification) {
    //   notificationCount++
    // }
  });

  const getTime = (time) => {
    var week = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    var month = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    let dd = time.split("-")[0].padStart(2, "0");
    let mm = time.split("-")[1].padStart(2, "0");
    let yyyy = time.split("-")[2].split(" ")[0];
    let hh = time.split("-")[2].split(" ")[1].split(":")[0].padStart(2, "0");
    let mi = time.split("-")[2].split(" ")[1].split(":")[1].padStart(2, "0");
    let secs = time.split("-")[2].split(" ")[1].split(":")[2].padStart(2, "0");
  
    mm = (parseInt(mm) - 1).toString(); // January is 0
  
    const date = new Date(yyyy, mm, dd, hh, mi, secs); 

    // let date = new Date(time).toUTCString();
    // var dateFormatted = date.replace('GMT','');
    var dateFormatted =  week[date.getDay()] + ', ' + date.getDate() + ' ' + month[date.getMonth()] + ' ' +  date.getFullYear() + ' ' + date.getHours() + ':' + (date.getUTCMinutes().toString().length <= 1 ? '0' : '') + date.getUTCMinutes();
    return dateFormatted;
  }

  let notificationsGroups = [
    {
      type: "EP",
      label: "Entry point",
      notifications: []
    },
    {
      type: "Giornaliero",
      label: "Giornalieri",
      notifications: []
    },
    {
      type: "Settimanale",
      label: "Settimanali",
      notifications: []
    },
    {
      type: "Mensile",
      label: "Mensili",
      notifications: []
    },
    {
      type: "Stagionale",
      label: "Stagionali",
      notifications: []
    }
  ];

  stations.forEach((element) => {
    notificationsGroups.map((notificationGroup) => {
      let cabine = element.impiantoDiRiduzione.filter((cabina) => {
        return cabina.limiteConsigliato && cabina.time === notificationGroup.type;
      });
      if (element.notification && element.state !== 1 && cabine.length > 0) {
        let impianto = {
          name: element.name,
          id: element.id,
          impiantoDiRiduzione: element.impiantoDiRiduzione.filter((cabina) => {
              return cabina.limiteConsigliato && cabina.time === notificationGroup.type;
          })
        }
        notificationGroup.notifications.push(impianto);
      }
      
    })
  });

  return (
    <WrapperAside className='dflex dflex__col' side={"right"}>
      <WrapperHeader>
        <div>
          <Title>Notification center</Title>
          <Subtitle>Notifiche totali <span>{notificationCount ? notificationCount : '0'}</span></Subtitle>
        </div>
        <Button
          icon={"closeX"}
          sizeIcon={30}
          height={"40px"}
          width={"40px"}
          padding={"0px"}
          action={action}
        />
        {notificationCount && <NotificationNumber>{notificationCount}</NotificationNumber>}
      </WrapperHeader>
      {!haveNotifications &&
        <Message>Oggi non sono presenti notifiche da segnalarti</Message>
      }
      {
        haveNotifications && notificationsGroups.map((notify) => {
          return (
            <div key={notify.type}>
              {notify.notifications.length > 0 &&
                <NotificationContainer>
                  <TimeLabel>{notify.label}</TimeLabel>
                  <NotificationCardContainer>
                    {notify.notifications.map((setLimiti, index) => {
                      return (
                        <div key={index}>
                        {setLimiti.impiantoDiRiduzione.length > 0 &&
                        <NotificationCard>
                          <Header>
                            <Name>{setLimiti.name.toLowerCase().replace(/\b(\w)/g, x => x.toUpperCase()).replace(/(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$|^\d/g, x => x.toUpperCase())}</Name>
                            {/* <div>{getTime(setLimiti.date)}</div> */}
                          </Header>
                          { setLimiti.impiantoDiRiduzione.map((setLimitiCabina, index) => {
                            return (
                              <div key={index}>
                                { setLimitiCabina.limiteConsigliato && <div className="cabin">
                                  <Header>
                                    <CabinName>CAB {setLimitiCabina.name}</CabinName>
                                    <div>{getTime(setLimitiCabina.limitDate)}</div>
                                  </Header>
                                    <LimitiContainer>
                                        <SetLimiti 
                                          cabina={setLimitiCabina} 
                                          isNotification="true"
                                          stationName={setLimiti.name} 
                                          actionLimitModal={showModalAction}
                                          confirmLimits={confirmLimits}
                                          confirmLimitsAction={confirmLimitsAction}
                                          />
                                    </LimitiContainer>
                                   </div>
                                }
                              </div>
                            )
                          })}
                        </NotificationCard>
                        }
                        </div>
                      )
                    })}
                  </NotificationCardContainer>
                </NotificationContainer>
              }
            </div>
          );
        })
      }
    </WrapperAside>
  );
};

export default React.memo(SidebarRight, (prevProps, nextProps) => isEqualToObject(prevProps, nextProps));
