import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardShop from "./CardShop";
import "./cardshop.css";

import {
  loadShops,
  likeShop,
  dislikeShop
} from "../../state_management/actions/shopActions";

const NearbyShops = props => {
  const [error, setError] = useState(undefined);
  const dispatch = useDispatch();

  const like = shop => dispatch(likeShop(shop));
  const disLike = shop => dispatch(dislikeShop(shop));
  const loadShopList = () => dispatch(loadShops());

  const shops = useSelector(state => state.shop.shops);

  useEffect(() => {
    const fetchData = async () => {
      const error = await loadShopList();

      if (error) {
        if (error.toString() === "[object PositionError]")
          setError({
            msg: "Allow access to location to show nearby shops to you"
          });
        else setError({ msg: "Internal Server Error" });
      }
    };

    fetchData();
  }, []);

  const likeShops = shop => {
    like(shop);
  };

  const dislikeShops = shop => {
    disLike(shop);
  };

  return (
    <>
      {error ? <p className="msg-err-global"> {error.msg} </p> : <></>}
      <div className="list-shops">
        {shops.map(shop => (
          <CardShop
            shopName={shop.shopName}
            imgUrl={shop.imgUrl}
            likeShop={() => likeShops(shop)}
            dislikeShop={() => dislikeShops(shop)}
          />
        ))}
      </div>
    </>
  );
};

export default NearbyShops;
