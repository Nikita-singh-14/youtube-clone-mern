import { MdHome } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { IoIosVideocam } from "react-icons/io";
import { VscNewCollection } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { MdUnsubscribe } from "react-icons/md";
import { NavLink } from "react-router-dom";

const NavOptions = [
    {
        icon: <MdHome />,
        label: "Home",
        slug: "/"
    },
    {
        icon: <LuHistory />,
        label: "History",
        slug: "/history"
    },
    {
        icon: <IoIosVideocam />,
        label: "My Content",
        slug: '/mycontent'
    },
    {
        icon: <MdUnsubscribe />,
        label: "Subscribers",
        slug: "/subscribers"
    },
    {
        icon: <VscNewCollection />,
        label: "Collection",
        slug: "/collection"
    },
    {
        icon: <AiFillLike />,
        label: "Liked Videos",
        slug: "/likedvideos"
    },
    {
        icon: <BiSupport />,
        label: "Support",
        slug: "/support"
    },
    {
        icon: <IoIosSettings />,
        label: "Settings",
        slug: "/settings"
    }
]

const Sidebar = () => {

    return (
        <div className="flex flex-col gap-2 bg-gray-800 min-h-screen px-2 pt-8 border border-white">
            {
                NavOptions.map((option, idx) =>
                    <NavLink
                        key={idx}
                        to={option.slug}
                        className={({ isActive }) =>
                            `text-xl flex items-center gap-2 rounded py-2 px-2 text-white
                        ${isActive ? "bg-gray-500 " : "hover:bg-gray-700"}`
                        }
                    >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                    </NavLink>
                )
            }

        </div>
    )
}
export default Sidebar