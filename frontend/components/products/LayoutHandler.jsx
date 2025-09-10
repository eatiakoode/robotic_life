import { useEffect } from "react";

export default function LayoutHandler({
  activeLayout,
  setActiveLayout,
  hasSidebar = false,
}) {
  // No resize handling needed since we only have one layout option
  useEffect(() => {
    // Always set to list layout (1) since it's the only option
    setActiveLayout(1);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <li
        className={`tf-view-layout-switch sw-layout-list list-layout active`}
        onClick={() => setActiveLayout(1)}
        data-value-layout="list"
      >
        <div className="item">
          <svg
            className="icon"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={3} cy={6} r="2.5" stroke="#181818" />
            <rect
              x="7.5"
              y="3.5"
              width={12}
              height={5}
              rx="2.5"
              stroke="#181818"
            />
            <circle cx={3} cy={14} r="2.5" stroke="#181818" />
            <rect
              x="7.5"
              y="11.5"
              width={12}
              height={5}
              rx="2.5"
              stroke="#181818"
            />
          </svg>
        </div>
      </li>
    </>
  );
}
