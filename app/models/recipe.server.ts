import axios from "axios";
import dayjs from "dayjs";
import { buildMongoConfig } from "~/utils";

type Recipe = {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  steps: string[];
  categories?: string[];
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

const createRecipe = async (
  title: string,
  description: string,
  ingredients: string[],
  steps: string[],
  categories: string[],
  photoUrl: string,
) => {
  const action = "insertOne";
  const document = {
    title,
    description,
    ingredients,
    steps,
    categories,
    photoUrl,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  };

  const config = buildMongoConfig({ action, document });
  const result = await axios(config);

  return result.data.insertedId;
};
const updateRecipe = async (
  id: string,
  title: string,
  description: string,
  ingredients: string[],
  steps: string[],
  categories: string[],
  photoUrl: string,
) => {
  const action = "updateOne";
  const filter = {
    _id: { $oid: id },
  };
  const update = {
    $set: {
      title,
      description,
      ingredients,
      steps,
      categories,
      photoUrl,
      updatedAt: dayjs().format(),
    },
  };

  const config = buildMongoConfig({ action, filter, update });
  const result = await axios(config);

  return result.data.modifiedCount;
};

const getRecipe = async (id: string) => {
  const action = "findOne";
  const filter = {
    _id: { $oid: id },
  };

  const config = buildMongoConfig({ action, filter });
  const result = await axios(config);

  return {
    ...result.data.document,
    createdAt: dayjs(result.data.document.createdAt).format("MMMM DD, YYYY"),
  };
};

const deleteRecipe = async (id: string) => {
  const action = "deleteOne";
  const filter = {
    _id: { $oid: id },
  };

  const config = buildMongoConfig({ action, filter });
  const result = await axios(config);

  return result.data.deletedCount;
};

const getRecipes = async (skip: number) => {
  const action = "find";
  const sort = { title: 1, _id: 1 };

  const config = buildMongoConfig({ action, sort, skip, limit: 8 });
  const result = await axios(config);

  return result.data.documents;
};

const getRecipeCount = async () => {
  const action = "aggregate";
  const pipeline = [
    {
      $count: "recipeCount",
    },
  ];
  const config = buildMongoConfig({ action, pipeline });
  const result = await axios(config);

  return result.data.documents[0].recipeCount;
};

const getCategories = async () => {
  const action = "aggregate";
  const pipeline = [
    {
      $group: {
        _id: null,
        categories: { $addToSet: "$categories" },
      },
    },
  ];
  const config = buildMongoConfig({ action, pipeline });
  const result = await axios(config);

  return result.data.documents[0].categories[0];
};

const searchRecipes = async (
  search: string,
  category: string,
  skip: number,
) => {
  const action = "aggregate";
  const sort = { title: 1, _id: 1 };
  const pipeline = [
    {
      $search: {
        index: "default",
        text: {
          query: search,
          path: {
            wildcard: "*",
          },
        },
        sort,
        count: {
          type: "total",
        },
      },
    },
  ];

  const config = buildMongoConfig({ action, pipeline, skip, category });
  const result = await axios(config);

  return result.data.documents;
};

export {
  createRecipe,
  updateRecipe,
  getRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeCount,
  getCategories,
  searchRecipes,
  type Recipe,
};
