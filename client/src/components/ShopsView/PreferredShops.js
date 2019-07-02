import React, { Component } from "react";
import { connect } from "react-redux";
import CardShop from "./CardShop";
import "./cardshop.css";

import {
  removeShop,
  loadFavoriteShops
} from "../../state_management/actions/shopActions";

class PreferredShops extends Component {
  componentWillMount = async () => {
    await this.props.loadFavoriteShops();
  };

  render() {
    const { removeShop, likedShops } = this.props;

    return likedShops.length === 0 ? (
      <p className="msg-global"> No shop added to favoret yet </p>
    ) : (
      <div className="list-shops">
        {likedShops.map(shop => (
          <CardShop
            shopName={shop.shopName}
            imgUrl={shop.imgUrl}
            removeShop={() => removeShop(shop)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  likedShops: state.shop.likedShops
});

export default connect(
  mapStateToProps,
  { removeShop, loadFavoriteShops }
)(PreferredShops);
