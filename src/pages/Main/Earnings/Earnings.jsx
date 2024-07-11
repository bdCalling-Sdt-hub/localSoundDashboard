import React from 'react';
import Status from '../../../Components/Status';
import FullRecentTransaction from '../../../Components/FullRecentTransaction';
import EarningStatus from '../../../Components/EarningStatus';

const Earnings = () => {
    return (
        <div>
             <EarningStatus/>
             <FullRecentTransaction/>
        </div>
    );
}

export default Earnings;
