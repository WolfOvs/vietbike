import React from "react";
	
import { PageNotEnable } from "./style";
import { Icon } from "../../ui";

function PageNotEnabledUser() {
	
	const backLogin = () => {
		localStorage.setItem('RIDP', null);
    }

	return (
		<PageNotEnable>
			<div className="container">
				<div className="row">
					<div className="xs-12 md-6 mx-auto">
						<div id="countUp">
							<Icon iconKey={'logo'} className={'img-spin'} size={80} />
							<div className="text">
								Non hai i permessi per poter accedere all’applicativo
              				</div>
							  <div onClick={()=> {
									backLogin();
								}}>
									Torna alla login
							  </div>
						</div>
					</div>
				</div>
			</div>
		</PageNotEnable>
	);
}

PageNotEnabledUser.propTypes = {};

PageNotEnabledUser.defaultProps = {};

export default PageNotEnabledUser;
