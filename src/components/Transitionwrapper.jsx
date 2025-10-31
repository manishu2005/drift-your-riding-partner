import React, { useEffect, useState } from 'react'

const Transitionwrapper = ({children})=>{
    const [Visible, setVisible] = useState(false);

    useEffect(()=>{
        const timer = setTimeout(()=> setVisible(true),50);
        return ()=> clearTimeout(timer);
    },[]);

    return (
        <div className={`transition-all duration-700 ease-out ${
            Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
            {children}
        </div>
    )
}

export default Transitionwrapper;