import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardShop from './CardShop';
import './cardshop.css';
import store from '../../state_management/store';

import {
  loadShops,
  likeShop,
  dislikeShop
} from '../../state_management/actions/shopActions';

class NearbyShops extends Component {
  state = {
    error: undefined
  };

  componentWillMount = async () => {
    console.log({ token: store.getState().account.token });
    const error = await this.props.loadShops();
    console.log(error);
    if (error) {
      if (error.toString() === '[object PositionError]')
        this.setState({
          error: { msg: 'Allow access to location to show nearby shops to you' }
        });
      else this.setState({ error: { msg: 'Internal Server Error' } });
    }
  };

  likeShop = shop => {
    this.props.likeShop(shop);
  };

  dislikeShop = shop => {
    this.props.dislikeShop(shop);
  };

  render() {
    const { shops } = this.props;
    const { error } = this.state;

    return (
      <>
        {error ? <p className='msg-err-global'> {error.msg} </p> : <></>}
        <div className='list-shops'>
          {shops.map(shop => (
            <CardShop
              shopName={shop.shopName}
              imgUrl={shop.imgUrl}
              likeShop={() => this.likeShop(shop)}
              dislikeShop={() => this.dislikeShop(shop)}
            />
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  shops: state.shop.shops
});

export default connect(
  mapStateToProps,
  { loadShops, likeShop, dislikeShop }
)(NearbyShops);
