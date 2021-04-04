import BaseService from "./base.service";

export async function startGameService(playersList) {
  try {
    return await BaseService({
      method: "GET",
      url: "/mainplay",
      data: {
        playersList,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
