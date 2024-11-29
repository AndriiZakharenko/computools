import { Account, Client } from "react-native-appwrite";

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

export const createuser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
