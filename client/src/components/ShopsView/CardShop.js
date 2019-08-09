import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "antd";

const CardShop = props => {
  const { shopName, imgUrl, likeShop, dislikeShop, removeShop } = props;

  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  return (
    <div className="card-shop">
      <h2>{shopName}</h2>
      <img src={imgUrl ? imgUrl : "/shop_img.png"} />
      <div>
        {isAuthenticated && (
          <>
            {likeShop ? (
              <>
                <span class="like" onClick={likeShop}>
                  <Icon type="like" />
                  {" Like"}
                </span>
                <span class="dislike" onClick={dislikeShop}>
                  <Icon type="dislike" />
                  {" Dislike"}
                </span>
              </>
            ) : (
              <span class="dislike" onClick={removeShop}>
                <Icon type="close-circle" />
                {" Remove"}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CardShop;
