import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import type { Models } from "react-native-appwrite";

import { ImageGravity } from "react-native-appwrite";

import Config from 'react-native-config';

export const appwriteConfig = {
  endpoint: Config.APPWRITE_ENDPOINT,
  platform: Config.APPWRITE_PLATFORM,
  projectId: Config.APPWRITE_PROJECT_ID,
  databaseId: Config.APPWRITE_DATABASE_ID,
  userCollectionId: Config.APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: Config.APPWRITE_VIDEO_COLLECTION_ID,
  storageId: Config.APPWRITE_STORAGE_ID,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export interface UserDocument {
  accountId: string;
  email: string;
  username: string;
  avatar: string;
}

interface VideoPostForm {
  title: string;
  thumbnail: File;
  video: File;
  prompt: string;
  userId: string;
}

// Register user
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
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
        username: username.trim(),
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

// Sign In
export async function signIn(email: string, password: string): Promise<Object> {
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
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Problems getting account";
    throw new Error(errorMessage);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error();
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Problems with getting current user";
    throw new Error(errorMessage);
  }
}

// Sign Out
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

// Upload File
export const uploadFile = async (file, type) => {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const filerUrl = await getFilePreview(uploadedFile.$id, type);
    return filerUrl;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Problems uploading file";
    throw new Error(errorMessage);
  }
};

// Get File Preview
export const getFilePreview = async (
  fileId: string,
  type: "video" | "image"
): Promise<string> => {
  try {
    const previewUrl =
      type === "video"
        ? storage.getFilePreview(appwriteConfig.storageId, fileId).toString()
        : storage
            .getFilePreview(
              appwriteConfig.storageId,
              fileId,
              2000,
              2000,
              ImageGravity.Top,
              100
            )
            .toString();

    return previewUrl;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Problems with getting preview"
    );
  }
};

// Create Video Post
export const createVideoPost = async (form: VideoPostForm): Promise<Models.Document> => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Problems uploading file"
    );
  }
};


// Get all video Posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt")]
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

// Get video posts created by user
export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
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

// Get video posts that matches search query
export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Problems with searching posts";
    throw new Error(errorMessage);
  }
};

// Get latest created video posts
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
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
