import React from "react";

import { PageNotFoundUI } from "./style";
import { Icon } from "../../ui";

function PageNotFound() {

	React.useEffect(() => {
		setTimeout(() => {
			const countUp = document.querySelector("#countUp");
			const number = countUp.querySelector(".number");
			const countTo = 404;
			let count = 0;
			setInterval(() => {
				if (count <= countTo) {
					number.innerText = `${count}`;
					count++;
				}
			}, 5);
		}, 1500);
	}, []);

	return (
		<PageNotFoundUI>
			<div className="container">
				<div className="row">
					<div className="xs-12 md-6 mx-auto">
						<div id="countUp">
							<Icon iconKey={'logo'} className={'img-spin'} size={200} />
							<div className="number" data-count="404">
								0
              </div>
							<div className="text">Page not found</div>
							<div className="text">This may not mean anything.</div>
							<div className="text">
								I'm probably working on something that has blown up.
              </div>
						</div>
					</div>
				</div>
			</div>
		</PageNotFoundUI>
	);
}

PageNotFound.propTypes = {};

PageNotFound.defaultProps = {};

export default PageNotFound;
