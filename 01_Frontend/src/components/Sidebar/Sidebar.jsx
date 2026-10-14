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
        label: "Subscriptions",
        slug: "/subscriptions"
    },
    {
        icon: <VscNewCollection />,
        label: "Playlists",
        slug: "/playlists"
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
        <nav aria-label="Main navigation" className="flex min-h-screen flex-col gap-2 border-r border-white/10 bg-[#181818] px-2 pt-5 md:pt-8">
            {
                NavOptions.map((option, idx) =>
                    <NavLink
                        key={idx}
                        to={option.slug}
                        title={option.label}
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded py-2 px-2 text-sm text-white transition-colors md:text-base
                        ${isActive ? "bg-gray-500 " : "hover:bg-gray-700"}`
                        }
                    >
                        <span className="shrink-0 text-xl">{option.icon}</span>
                        <span className="hidden truncate sm:inline">{option.label}</span>
                    </NavLink>
                )
            }

        </nav>
    )
}
export default Sidebar