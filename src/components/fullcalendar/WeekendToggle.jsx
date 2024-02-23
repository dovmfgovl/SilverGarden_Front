import React from 'react';

const WeekendToggle = ({ weekendsVisible, setWeekendsVisible }) => {
    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible);
    };

    return (
        <div className="form-check form-switch">
        <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {weekendsVisible ? '주말 표시' : '주말 미표시'}
        </label>
        </div>
    );
};

export default WeekendToggle;
