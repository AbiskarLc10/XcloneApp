"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";

const SideBar = () => {

  const [togglemenu,setToggleMenu] = useState(false)
  const { data } = useSession();

  return (
    <>
      <div className=" relative flex sm:flex-col justify-center items-center sm:items-start p-3  gap-4">
        <Link href={"/"}>
          <FaXTwitter className=" w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-100 animate-bounce" />
        </Link>
        <Link
          href={"/"}
          className=" w-fit sm:w-auto sm:flex sm:items-center  sm:gap-2 hover:bg-gray-200 p-1 rounded-xl"
        >
          <HiHome className="text-2xl sm:text-xl" />
          <span className=" hidden sm:inline">Home</span>
        </Link>
        {data ? (
          <button
            className="hidden sm:inline items-center  w-36 h-8 bg-blue-400 rounded-2xl text-white font-semibold text-sm hover:brightness-95 shadow-md"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="hidden sm:inline items-center  w-36 h-8 bg-blue-400 rounded-2xl text-white font-semibold text-sm hover:brightness-95 shadow-md"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
      {data ? (
        <>
        {
          togglemenu &&
          <div className=" transition duration-100 sm:hidden absolute right-[100px] flex flex-col gap-1 border-2 p-1 rounded-md shadow-lg" onMouseLeave={()=> setToggleMenu(false)}>
          <div className=" flex justify-center items-center hover:bg-sky-300 border-b-2  hover:text-white cursor-pointer p-1 rounded-md ">
            <p className=" text-sm font-semibold" onClick={()=> signOut()}>Sign Out</p>
          </div>
          <div className=" flex justify-center items-center hover:bg-sky-300 border-b-2  hover:text-white cursor-pointer p-1 rounded-md ">
            <p className=" text-sm font-semibold">Profile</p>
          </div>
        </div>

        }
        
        <div className=" w-fit flex items-center md:gap-2 md:w-52 sm:border-2 border-transparent sm:hover:border-2 cursor-pointer sm:hover:bg-gray-200 hover:border-gray-300 rounded-3xl p-[2px]">
          <div className=" flex justify-center items-center w-12 h-12 rounded-full border-[1.5px] border-gray-400">
            <img src={data.user.image} className=" w-[40px] h-[40px] rounded-full" alt={data?.user?.image} width={70} onMouseEnter={()=> setToggleMenu(togglemenu?false:true)} />
          </div>
          <div className="hidden md:block">
          <p className=" text-sm text-gray-800 font-bold">{data.user.name}</p>
          <p className=" md:block text-xs text-gray-800">{data.user.email}</p>

          </div>
        </div>
        </>
      ):(
        <button
        className="sm:hidden items-center  w-36 h-8 bg-blue-400 rounded-2xl text-white font-semibold text-sm hover:brightness-95 shadow-md"
        onClick={() => signIn()}
      >
        Sign In
      </button>
      )}
    </>
  );
};

export default SideBar;
