import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { HiArrowsRightLeft,HiArrowRightOnRectangle,HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { decoded } from "@/utils/decoded";
import api from "@/utils/api";
import { useRouter } from "next/router";
const NavBar = () => {
    // const [active, setActive] = useState("dashboard");
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const {decodedToken,decodeduser,checkedtoken,checkedauthedusertoken} =decoded()
    const menus = [
        { name: "dashboard", query: decodeduser?.emai, icon: MdOutlineDashboard,pathname:"/home" },
        { name: "compare", link: "/groupCompare", query: decodeduser?.emai, icon: HiArrowsRightLeft,pathname:"/groupCompare"  },
        { name: "Logout", link:  "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000", icon: HiArrowRightOnRectangle,margin:true },
    ];
    const navigate =async(menu)=>{
        if(menu.name === "Logout"){ 
            try {
                const res = await api.get('logout')
                if (res.data === "done") {
                    window.location = menu.link;  
                }
            } catch (error) {
                console.log(error);
            }
        }
        else router.push({pathname:menu?.pathname,query:{id:menu?.query}},menu?.pathname);

    }
   
  return (
    <>
        <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    
                    <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Url-Inspecter</span>
                    </a>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center ml-3">
                        <div>
                            {checkedauthedusertoken && decodeduser && (
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src={decodeduser.picture} alt="user photo" />
                                </button>
                            )}
                        </div>
                       
                    </div>
                    </div>
                </div>
            </div>
        </nav>
        {checkedauthedusertoken && decodeduser && (
            <aside  className={` fixed top-0 left-0 bottom-0 z-40  dark:bg-gray-800 dark:border-gray-700 ${open ? "w-44": "w-16"} pt-14 duration-500 text-gray-100 px-4`}>
                <div className="py-3 flex justify-end">
                    <HiOutlineChevronDoubleRight
                        size={26}
                        className={ `${open && "rotate-180"} cursor-pointer`}
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                        <div
                        key={i}
                            className={` ${
                                menu?.margin && "mt-5"
                            }   group flex items-center text-sm  gap-3.5 font-medium p-2 cursor-pointer  rounded-md`}
                            onClick={(e)=>{navigate(menu);e.preventDefault()}}
                        >
                            <div>{React.createElement(menu?.icon, { size: "22" })}</div>
                            <h2
                                style={{
                                transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${
                                !open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${
                                open && "hidden"
                                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu?.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </aside>
        )}  
            


    </>
  )
}

export default NavBar