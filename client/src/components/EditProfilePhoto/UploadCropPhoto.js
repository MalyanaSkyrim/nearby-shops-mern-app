import React, { Component } from "react";
import UploadPhoto from "./UploadPhoto";
import CropPhoto from "./CropPhoto";
import "./cropPhoto.css";

class UploadCropPhoto extends Component {
  state = {
    photo: this.props.photo
  };

  uploadPhoto = file => {
    const { photo } = this.state;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.props.updateOriginalImage(reader.result);
        return this.setState({
          photo: {
            ...photo,
            originalPhoto: reader.result
          }
        });
      });
      reader.readAsDataURL(file);
    });
  };

  render() {
    const { photo } = this.state;
    console.log({ photo });
    return (
      <>
        {photo.originalPhoto && (
          <CropPhoto photo={photo} handleCrop={this.props.handleCrop} />
        )}
        <UploadPhoto action={this.uploadPhoto} />
      </>
    );
  }
}

export default UploadCropPhoto;
