import { useEffect } from "react";

export default function LayoutHandler({
  activeLayout,
  setActiveLayout,
  hasSidebar = false,
}) {
  // Set default to 4x4 grid layout
  useEffect(() => {
    setActiveLayout(4); // Always set to 4-column grid
  }, []);

  return (
    <>
      {/* Only 4x4 Grid Layout Option */}
      <li
        className="tf-view-layout-switch sw-layout-grid grid-layout active"
        data-value-layout="grid-4"
      >
        <div className="item">
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="6" y="1" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="11" y="1" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="16" y="1" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="1" y="6" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="6" y="6" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="11" y="6" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="16" y="6" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="1" y="11" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="6" y="11" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="11" y="11" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="16" y="11" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="1" y="16" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="6" y="16" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="11" y="16" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
            <rect x="16" y="16" width="4" height="4" rx="1" stroke="#181818" strokeWidth="1.5"/>
          </svg>
        </div>
      </li>
    </>
  );
}
