import React from 'react';

const GubunToggle = ({ All, Selected }) => {
    const handleGubunToggle = () => {
        Selected(!All);
    };

    return (
        <div className="form-check form-switch" style={{alignItems : 'center', marginTop:'5px' }}>
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={All}
                onChange={handleGubunToggle}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"  >
                {All ? '전체' : '진행 중'}
            </label>
        </div>
    );
};

export default GubunToggle;
