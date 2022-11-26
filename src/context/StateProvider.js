import React, { createContext, useState } from 'react';

export const stateContext = createContext();

const StateProvider = ({children}) => {

    const [advertisement, setAdvertisement] = useState([]);

    const stateInfo = {advertisement, setAdvertisement}

    return (
        <div>
            <stateContext.Provider value={stateInfo}>
                {children}
            </stateContext.Provider>
        </div>
    );
};

export default StateProvider;