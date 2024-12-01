import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.test.computools",
  projectId: "6749c26000228f3e9aa5",
  databaseId: "6749c7cb00306f636a37",
  userCollectionId: "6749c8340010b29b9189",
  imageCollectionId: "6749c86d0036c1b4d3ec",
  storageId: "6749d84e000f6225618e",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export interface UserData {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument {
  accountId: string;
  email: string;
  username: string;
  avatar: string;
}

export const createUser = async (data: UserData): Promise<UserDocument> => {
  const { email, password, username } = data;
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create an account.");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument<UserDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(errorMessage);
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<Object> => {
  try {
    const activeSession = await account.get();
    console.log("Active session found:", activeSession);
    return activeSession;
  } catch (error) {
    console.log("No active session found, creating a new one.");
  }
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Sign-in failed.";
    throw new Error(errorMessage);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error();
    return currentUser.documents[0];
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Problems getting current user";
    throw new Error(errorMessage);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );

    return posts.documents;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Problems with getting all posts";
    throw new Error(errorMessage);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Problems with getting latets posts";
    throw new Error(errorMessage);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Problems with searching posts";
    throw new Error(errorMessage);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Problems with getting User posts";
    throw new Error(errorMessage);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Problems with signing out";
    throw new Error(errorMessage);
  }
};
