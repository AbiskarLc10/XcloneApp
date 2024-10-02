"use client"
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "./SideBar";
import { useState } from "react";
const SideBarMainComp = () => {

  return (
    <>

          <div className={`  flex sm:sticky top-0 left-0 sm:flex-col items-center justify-between p-3 sm:h-screen border-r-2`}>
            <SideBar />
          </div>
    </>
  )
}

export default SideBarMainComp