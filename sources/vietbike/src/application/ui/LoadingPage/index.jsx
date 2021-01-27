import React from 'react';

import { Icon } from '../base';
import { WrappereLoading } from './style';

const Loading = ({type}) => <WrappereLoading type={type}><Icon iconKey={'loadingImage'} size={80}/></WrappereLoading>

export default Loading;