import prisma from "./prisma";

async function getAllMenuIds() {
  const data = await prisma.menu.findMany({
    select: {
      id: true,
    },
  });

  return data.map((menu) => {
    return {
      params: {
        menuId: menu.id,
      },
    };
  });
}

async function getMenuById(id: string) {
  const menu = await prisma.menu.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      recipes: {
        select: {
          id: true,
          title: true,
        }
      }
    },
  });

  return menu;
}

async function getMenus() {
  const menus = await prisma.menu.findMany();
  return menus;
}

async function createMenu(
  title: string,
  description: string,
  recipes: string[],
  authorEmail: string
) {
  const menu = await prisma.menu.create({
    data: {
      title,
      description,
      recipes: {
        connect: recipes.map((recipeId) => ({ id: recipeId })),
      },
      author: {
        connect: {
          email: authorEmail,
        },
      },
    },
  });

  return menu;
}

async function searchMenus(
  query: string,
  category: string,
  page: string,
  limit: string
): Promise<any> {
  let menus: any[] = [];

  if (query.length === 0 && category.toLowerCase() === "all") {
    menus = await prisma.menu.findMany({
      skip: parseInt(page),
      take: parseInt(limit),
    });
  } else if (query.length === 0 && category.toLowerCase() !== "all") {
    menus = await prisma.menu.findMany({
      where: {
        categories: {
          has: category,
        },
      },
      skip: parseInt(page),
      take: parseInt(limit),
    });
  } else if (query.length !== 0 && category.toLowerCase() === "all") {
    menus = await prisma.menu.findMany({
      where: {
        title: {
          search: query,
        },
      },
      skip: parseInt(page),
      take: parseInt(limit),
    });
  }
  return menus;
}


export { getMenuById, createMenu, getMenus, getAllMenuIds, searchMenus };
