import React from 'react';

import SideBar from './sidebar/SideBar';
import Calendar from './calendar/Calendar';

const Main = () => {
    return (
        <div className="wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <SideBar />
                                    <Calendar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
