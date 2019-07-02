import {
  LIKE_SHOP,
  DISLIKE_SHOP,
  LOAD_ALL_SHOPS,
  REMOVE_SHOP,
  LOAD_LIKED_SHOPS
} from "./types";
import axios from "../../api/axiosInstance";

function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export const loadFavoriteShops = () => async dispatch => {
  try {
    const response = await axios.get("/api/shops/favoriteshops");

    dispatch({ type: LOAD_LIKED_SHOPS, payload: response.data.likedShops });
    return;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const loadShops = () => async dispatch => {
  try {
    const { coords } = await getCurrentPosition();
    const { latitude, longitude } = coords;

    const response = await axios.get("/api/shops/nearbyshops", {
      params: {
        lat: latitude,
        long: longitude
      }
    });
    const shops = response.data.items.map(shop => ({
      id: shop.id,
      shopName: shop.title
    }));
    dispatch({ type: LOAD_ALL_SHOPS, payload: shops });
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const likeShop = likedShop => async dispatch => {
  try {
    await axios.post("/api/shops/likedshops", likedShop);

    dispatch({ type: LIKE_SHOP, payload: likedShop });
  } catch (err) {
    console.log(err);
  }
};

export const dislikeShop = dislikedShop => async dispatch => {
  try {
    await axios.post("/api/shops/dislikedshops", dislikedShop);

    dispatch({ type: DISLIKE_SHOP, payload: dislikedShop });
  } catch (err) {
    console.log(err);
  }
};

export const removeShop = removedShop => async dispatch => {
  try {
    console.log({ removedShop });
    const res = await axios.delete(
      `/api/shops/favoriteshops/${removedShop.id}`
    );
    console.log({ res });
    dispatch({ type: REMOVE_SHOP, payload: removedShop });
  } catch (err) {
    console.log(err);
    return err;
  }
};
