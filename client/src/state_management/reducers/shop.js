import {
  LIKE_SHOP,
  DISLIKE_SHOP,
  LOAD_ALL_SHOPS,
  REMOVE_SHOP,
  LOAD_LIKED_SHOPS
} from '../actions/types';

const initialState = {
  shops: [
    // { id: 1, shopName: 'shop 1', imgUrl: 'https://picsum.photos/400/400' },
    // { id: 2, shopName: 'shop 2', imgUrl: 'https://picsum.photos/300/400' },
    // { id: 3, shopName: 'shop 3', imgUrl: 'https://picsum.photos/400/300' },
    // { id: 4, shopName: 'shop 4', imgUrl: 'https://picsum.photos/200/400' }
  ],
  likedShops: [],
  dislikedShops: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIKE_SHOP: {
      let { likedShops, shops } = state;
      likedShops.push(action.payload);
      shops = shops.filter(shop => shop.id != action.payload.id);
      return {
        ...state,
        shops
      };
    }

    case DISLIKE_SHOP: {
      let { dislikedShops, shops } = state;
      dislikedShops.push(action.payload);
      shops = shops.filter(shop => shop.id != action.payload.id);
      return { ...state, shops };
    }

    case LOAD_ALL_SHOPS: {
      return { ...state, shops: action.payload };
    }
    case LOAD_LIKED_SHOPS: {
      return { ...state, likedShops: action.payload };
    }
    case REMOVE_SHOP: {
      {
        let { likedShops } = state;
        likedShops = likedShops.filter(shop => shop.id != action.payload.id);
        return {
          ...state,
          likedShops
        };
      }
    }

    default:
      return state;
  }
}
