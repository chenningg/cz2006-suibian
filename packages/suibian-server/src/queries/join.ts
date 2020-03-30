import Join from "../models/join.model";
export const updateUserQuery = async (
  roomcode: string,
  username: string,
  data: any
): Promise<void> => {
  try {
    await Join.update<Join>(data, {
      where: {
        roomcode,
        username
      }
    });
  } catch (err) {
    console.log(`error message :${err}`);
  }
};
