import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface MenuBoxProps {
  menu: any;
}

export default function MenuBox(props: MenuBoxProps) {
  const { menu } = props;

  return (
    <Link href={`/menus/${menu.id}`}>
      <div className="flex flex-1 flex-col p-8">
        {/* <Image className="mx-auto h-30 w-30 flex-shrink-0" width={30} height={30} src={menu.images[0]} alt="" /> */}
        <h3 className="mt-6 text-lg font-medium text-gray-900">
          {menu.title}
        </h3>
        {/* <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dd className="text-sm text-gray-500">{menu.category}</dd>
                </dl> */}
      </div>
    </Link>
  );
}
