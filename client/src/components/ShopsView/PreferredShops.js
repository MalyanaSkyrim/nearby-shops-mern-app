import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardShop from "./CardShop";
import "./cardshop.css";

import {
  removeShop,
  loadFavoriteShops
} from "../../state_management/actions/shopActions";

const PreferredShops = () => {
  const dispatch = useDispatch();
  const likedShops = useSelector(state => state.shop.likedShops);
  const loadLikdedShops = () => dispatch(loadFavoriteShops());
  const deleteShop = shop => dispatch(removeShop(shop));

  useEffect(() => {
    loadLikdedShops();
  }, []);

  return likedShops.length === 0 ? (
    <p className="msg-global"> No shop added to favoret yet </p>
  ) : (
    <div className="list-shops">
      {likedShops.map(shop => (
        <CardShop
          shopName={shop.shopName}
          imgUrl={shop.imgUrl}
          removeShop={() => deleteShop(shop)}
        />
      ))}
    </div>
  );
};

export default PreferredShops;
