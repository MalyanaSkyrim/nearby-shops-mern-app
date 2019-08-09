import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class CropPhoto extends PureComponent {
  state = {
    src: this.props.photo.originalPhoto,
    crop: {
      unit: "px",
      width: 500,
      aspect: 1,
      ...this.props.photo.crop
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const { croppedImageUrl, croppedImageData } = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.props.handleCrop(croppedImageData, crop);
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(async blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        let reader = new FileReader();

        reader.addEventListener("load", () => {
          const croppedImageData = reader.result;

          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve({ croppedImageUrl: this.fileUrl, croppedImageData });
        });
        reader.readAsDataURL(blob);
      }, "image/jpeg");
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ src: props.photo.originalPhoto });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <div className="crop-photo">
        {src && (
          <ReactCrop
            width="100%"
            imageStyle={{ width: "100%", maxWidth: "600px", height: "auto" }}
            className="react-crop"
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <div className="cropped-photo">
            <img alt="Crop" src={croppedImageUrl} />
          </div>
        )}
      </div>
    );
  }
}

export default CropPhoto;
