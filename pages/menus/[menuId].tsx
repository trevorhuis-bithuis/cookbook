import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getAllMenuIds, getMenuById } from "../../lib/menus";
import Image from "next/image";
import { useState } from "react";
import DeleteMenuModal from "../../components/deleteModal";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

export async function getStaticPaths() {
  const paths = await getAllMenuIds();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const menu = await getMenuById(params.menuId);
  return {
    props: {
      menu: JSON.parse(JSON.stringify(menu)),
    },
  };
}

const Menu: NextPage = ({ menu }: any) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [openDelete, setOpenDelete] = useState(false);
  const { menuId } = router.query;

  const userHasValidSession = Boolean(session);
  const menuBelongsToUser = session?.user?.email === menu.author.email;

  async function deleteMenu(): Promise<void> {
    await fetch(`/api/menus/${menuId}`, {
      method: "DELETE",
    });
    router.back();
  }

  async function editMenu(): Promise<void> {
    await router.push(`/menus/edit/${menuId}`);
  }

  const dateCreated = dayjs(menu.createdAt).format("MMMM D, YYYY");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
      <p className="text-4xl font-bold text-gray-900 p-1">{menu.title}</p>
      <p className="text-md text-gray-500 mt-2">
        Menu by {menu.author.name} | Published on {dateCreated}
      </p>
      <p className="text-2xl text-gray-500 mt-2">Description</p>
      <p className="text-gray-900">{menu.description}</p>
      {userHasValidSession && menuBelongsToUser && (
        <div className="flex">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-2"
            onClick={() => editMenu()}
          >
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-2"
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </button>
        </div>
      )}
      <DeleteMenuModal
        open={openDelete}
        setOpen={setOpenDelete}
        itemToDelete={"Menu"}
        onDelete={deleteMenu}
      />
    </div>
  );
};

export default Menu;
