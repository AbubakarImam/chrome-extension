import { useState } from 'react';

const useComponentVisibility = () => {
    const [isVisible, setIsVisible] = useState(true);

    const showComponent = () => {
        console.log("showComponent called");
        setIsVisible(true);
    };

    const hideComponent = () => {
        setIsVisible(false);
    };

    return {
        isVisible,
        showComponent,
        hideComponent
    };
};

export default useComponentVisibility;
