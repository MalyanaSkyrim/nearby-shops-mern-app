import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

class CardShop extends Component {
  render() {
    const {
      shopName,
      imgUrl,
      likeShop,
      dislikeShop,
      removeShop,
      isAuthenticated
    } = this.props;

    return (
      <div className='card-shop'>
        <h2>{shopName}</h2>
        <img src={imgUrl ? imgUrl : '/shop_img.png'} />
        <div>
          {isAuthenticated && (
            <>
              {likeShop ? (
                <>
                  <span class='like' onClick={likeShop}>
                    <Icon type='like' />
                    {' Like'}
                  </span>
                  <span class='dislike' onClick={dislikeShop}>
                    <Icon type='dislike' />
                    {' Dislike'}
                  </span>
                </>
              ) : (
                <span class='dislike' onClick={removeShop}>
                  <Icon type='close-circle' />
                  {' Remove'}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.account.isAuthenticated
});

export default connect(mapStateToProps)(CardShop);
