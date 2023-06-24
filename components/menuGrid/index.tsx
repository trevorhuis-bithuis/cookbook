import MenuBox from "./menuBox";
import { useState } from "react";

interface MenuGridProps {
  menus: any[];
}

export default function MenuGrid(props: MenuGridProps) {
  const { menus } = props;

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4"
    >
      {menus.map((menu) => (
        <li
          key={menu.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <MenuBox menu={menu} />
        </li>
      ))}
    </ul>
  );
}
