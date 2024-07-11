import React from 'react';
import Status from '../../../Components/Status';
import BarChartIncomeRatio from '../../../Components/BarChatIncomeRatio';
import RecentTransaction from '../../../Components/RecentTransaction';

const DashboardHome = () => {
    return (
        <div className=''>
            <Status/>
            <BarChartIncomeRatio/>
            <RecentTransaction/>
            {/* <DashboardEventsList/> */}
            {/* <DashboardMatchesList/> */}
        </div>
    );
}

export default DashboardHome;
 