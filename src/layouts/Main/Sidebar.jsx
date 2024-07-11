import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/dashboard-logo.png";
import { BiSolidDashboard } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { BsCalendar2 } from "react-icons/bs";
import { BiDollarCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { HiLogout } from "react-icons/hi";
import { TbTargetArrow } from "react-icons/tb";
import { FaCalendarDays } from "react-icons/fa6";
import { IoChatbubblesSharp } from "react-icons/io5";
import { RiCurrencyLine } from "react-icons/ri";
import { RiExchangeDollarLine } from "react-icons/ri";
import { HiOutlineBars4 } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { FaToolbox } from "react-icons/fa6";
import Swal from "sweetalert2";
import { TfiCrown } from "react-icons/tfi";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    
    // Swal.fire({
    //   title: "Do you want to Logout from here?",
    //   showDenyButton: true,
    //   showCancelButton: false,
    //   confirmButtonText: "Yes",
    //   denyButtonText: `No`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user-update");

    //     navigate("/auth");
    //   } else if (result.isDenied) {
    //     Swal.fire("Ok", "", "info");
    //   }
    // });

    navigate("/auth");
  };
  return (
    <div className="w-[350px] flex flex-col text-secondary justify-between bg-primary min-h-screen rounded-lg border-2 ">
      <div className="">
        <div className="p-[20px]">
          {/* <img className="w-[200px] mx-auto" src={logo} alt="" /> */}
        </div>
        <div className="">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "flex text-[#3BA6F6] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[white]  rounded-lg "
                    : isActive
                    ? "flex text-primary gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px] bg-secondary  mx-[16px] rounded-lg "
                    : "flex text-secondary gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px] mx-[16px] rounded-lg"
                }
              >
                <div className="flex justify-start items-center gap-2">
                  <BiSolidDashboard width={25} height={25} /> Dashboard
                </div>
              </NavLink>
            </li>


            {/* <NavLink
              to="/chats"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-white gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px] bg-secondary  m-[16px] rounded-lg"
                  : "flex text-secondary gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px]  m-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
              <IoChatbubblesSharp width={25} height={25} />
                Chats
              </div>
            </NavLink> */}

            <NavLink
              to="/earning"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-primary gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-primary gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px] bg-secondary  mx-[16px] rounded-lg"
                  : "flex  gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px]  mx-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
              <RiCurrencyLine  width={25} height={25}/>
                Earnings
              </div>
            </NavLink>

            <NavLink
              to="/users"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] mx-[16px] rounded-lg"
                  : isActive
                  ? "flex text-primary gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px] bg-secondary  mx-[16px] rounded-lg"
                  : "flex  gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px]  mx-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                <HiOutlineUsers width={25} height={25} />
                All Users
              </div>
            </NavLink>

           

           

            <NavLink
              to="/artists"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-primary gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px] bg-secondary  mx-[16px] rounded-lg"
                  : "flex  gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px]  mx-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
              <HiOutlineUsers width={25} height={25} />
              Artists
              </div>
            </NavLink>

<NavLink
              to="/subscriptions"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-primary gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px] bg-secondary  mx-[16px] rounded-lg"
                  : "flex  gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px]  mx-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
              <TfiCrown  width={25} height={25} />
              Subscription
              </div>
            </NavLink>

          

            <NavLink
              to="/withdraw-request"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[28px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-primary gap-2 cursor-pointer items-center text-[22px] font-medium p-[20px] bg-secondary  mx-[16px] rounded-lg"
                  : "flex  gap-2 cursor-pointer items-center text-[22px] font-medium p-[20px]  mx-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
              <RiExchangeDollarLine width={35} height={35} />
              Withdraw Request
              </div>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-primary gap-2 cursor-pointer items-center  text-[22px] font-medium p-[20px] bg-secondary  mx-[16px] rounded-lg"
                  : "flex  gap-2 cursor-pointer items-center text-[22px] font-medium p-[20px]  mx-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                <CiSettings width={25} height={25} /> <span className="flex-1">Settings</span>
              </div>
            </NavLink>


          </ul>
        </div>
      </div>
      <div className="mb-[32px]">
        <div
          onClick={handleLogOut}
          className="flex items-center ml-[18px] cursor-pointer gap-2 text-[red] font-medium"
        >
          <HiLogout width={25} height={25} />
          <span className="text-[20px] ">Log Out</span>
        </div>
        {/* <Link to="/" className="flex items-center ml-[18px] cursor-pointer gap-2 text-[#3BA6F6] font-medium">
            
          </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
