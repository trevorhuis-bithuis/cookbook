import axios from "axios";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import { Collection, buildMongoConfig } from "~/utils";

const collection = Collection.user;

export type User = {
  id: string;
  email: string;
  isOwner: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getUserById(id: string) {
  const action = "findOne";
  const filter = {
    _id: { $oid: id },
  };

  const config = buildMongoConfig({ collection, action, filter });
  const result = await axios(config);

  return {
    ...result.data.document,
    createdAt: dayjs(result.data.document.createdAt).format("MMMM DD, YYYY"),
  };
}

export async function getUserByEmail(email: string) {
  const action = "findOne";
  const filter = {
    email,
  };

  const config = buildMongoConfig({ collection, action, filter });
  const result = await axios(config);

  if (!result.data.document) {
    return false;
  }

  return {
    ...result.data.document,
    createdAt: dayjs(result.data.document.createdAt).format("MMMM DD, YYYY"),
  };
}

export async function createUser(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (user) return false;

  const hashedPassword = await bcrypt.hash(password, 10);

  const action = "insertOne";
  const document = {
    email,
    password: hashedPassword,
    userType: "standard",
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  };

  const config = buildMongoConfig({ collection, action, document });
  const result = await axios(config);

  return result.data.insertedId;
}

export async function deleteUserByEmail(email: User["email"]) {
  const action = "deleteOne";
  const filter = {
    email,
  };

  const config = buildMongoConfig({ collection, action, filter });
  const result = await axios(config);

  return result.data.deletedCount;
}

export async function verifyLogin(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) return false;
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
