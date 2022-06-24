// import dateformat from 'dateformat';
import {Date as ODate} from '../../../../o-date/src/tsx/date';
import {toDate} from '../concerns/date-time';

export default ({publishedDate}) => {
	const day = toDate(publishedDate).getDate();
	const month = toDate(publishedDate).getMonth();
	const year = toDate(publishedDate).getFullYear();
	const dateToDisplay = `${day} ${month} ${year}`;
	return (
		<div className="o-teaser__timestamp">
			{/* <ODate dateTime={publishedDate} format="date-only" className="o-date"> */}
				{/* {dateToDisplay} */}
			{/* </ODate> */}
			<time
				className="o-teaser__timestamp-date"
				dateTime={publishedDate}></time>
		</div>
	);
};
