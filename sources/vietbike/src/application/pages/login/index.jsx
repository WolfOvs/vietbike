import React from "react";
import { connect } from "react-redux";
import { getRoleLogin } from '../../../redux/actions/login';

import IconCollection from '../../ui/base/Icon/svg';
import { WrapperImage, WrapperForm, Text, WrapperLogo, WrapperButton } from './style';
import { SnamLogo, Input, ButtonLogin } from '../../ui/base';

function Login(props) {
    const {
        dispatchRoleLogin,
        user
	} = props;

    const[required, setRequired] = React.useState(false);
    const[notInList, setNotInList] = React.useState(false);

    const [userLogin, changeUserLogin] =
		React.useState({
			ridp: null,
        });
    const [ridp, setRidp] = React.useState(null);

    const isLogin = true;

    React.useEffect(() => {
		if (JSON.stringify(userLogin) !== JSON.stringify(user)) {
			changeUserLogin(user);
        }
        if(userLogin.status === 'OK') {
            props.history.push({
                pathname: '/',
                ridp: ridp,
                token: ridp,
              });
        } 
        if(userLogin.status === 'not avaliable') {
            setNotInList(true);
        }
	}, [user, userLogin]);
    
    const submitLogin = () => {
        const username = document.querySelector('.username').value.length;
        const usernameVal = document.querySelector('.username').value;
        if(username > 0) {
            setRequired(false);
            dispatchRoleLogin({ username: usernameVal });
            setRidp(usernameVal)
        } else {
            setRequired(true);
        }
    }

    return(
        <div>
            <WrapperImage icon={IconCollection['imageLogin']}></WrapperImage>
            <WrapperForm>
                <WrapperLogo>
                    <SnamLogo size={75} />
                </WrapperLogo>
                <Text>Login using your username and password</Text>
                <Input 
                    isLogin={isLogin}
                    type={'text'}
                    placeholder={'Insert your username'}
                    height={28}
                    id={'username'}
                    name={'username'}
                    className={'username'}
                    />
                {required && <Text required={required}>Insert required fields</Text>}
                {notInList && <Text required={notInList}>Il tuo account non è abilitato all'accesso</Text>}
                <WrapperButton>
                    <ButtonLogin
                        onClick={()=> {
                            submitLogin();
                        }}
                    />
                </WrapperButton>
                {/* <Text>In case of problems, please check the profile. Click <a href="#">here</a> .</Text> */}
            </WrapperForm>
        </div>
    );
}

Login.propType = {

};

Login.defaultProps = {

};

export default connect(
	state => {
		return {
			user: state.user,
			serviceError: state.notifications.serviceError
		};
	},
	dispatch => {
		return {
			dispatchRoleLogin: (filters, token) => dispatch(getRoleLogin(filters, token)),
		};
	}
)(Login);