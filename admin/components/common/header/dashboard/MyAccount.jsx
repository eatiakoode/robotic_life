'use client'

import Link from "next/link";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import { SafeImage } from "../../../../utils/imageUtils";
import { usePathname } from "next/navigation";

import { useRouter, useParams } from "next/navigation";
import useAuth from "../../../../utils/useAuth";

const MyAccount = () => {
  useAuth();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/cmsthebotsworld');
  };
  const pathname = usePathname()
  const profileMenuItems = [
    // { id: 1, name: "My Profile", ruterPath: "/my-profile" },
    // { id: 2, name: " My Message", ruterPath: "/my-message" },
    // { id: 3, name: " My Favourite", ruterPath: "/my-favourites" },
    // { id: 4, name: " My Package", ruterPath: "/my-package" },
    // { id: 5, name: " Log out", ruterPath: "/login" },
  ];
// const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="user_set_header">
        <SafeImage
          width={40}
          height={40}
          className="float-start"
          src="/assets/images/property/man.png"
          alt="e1.png"
        />
        <p>
          Admin<br />
          <span className="address">admin@akoode.in</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.ruterPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, pathname)
                ? { color: "#ff5a5f" }
                : undefined
            }
          >
            {item.name}
          </Link>
        ))}
        
            <a className="dropdown-item" href="#"  onClick={() => handleLogout()}>
              Log out
            </a>
          </div>
    </>
  );
};

export default MyAccount;
