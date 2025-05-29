"use client";

import UserPageHome from "../userPageHome";
import { usePathname } from "next/navigation";

const PageUser = () => {
  const url = usePathname();
  const id = parseInt(url.split("=")[1]);

  return <UserPageHome id={id}/>;
};

export default PageUser;
