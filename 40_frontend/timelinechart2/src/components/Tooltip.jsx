import { useState } from 'react';

const Tooltip = ({ children, content }) => {
    const [show, setShow] = useState(false);
    return (
      <div style={{ position: "relative" }}>
        <div 
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {children}
        {show && <div className="tooltip">{content}</div>}
        </div>
      </div>
    );
  };
  
  export default Tooltip;