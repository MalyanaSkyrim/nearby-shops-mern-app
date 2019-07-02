import React from 'react';
import { Upload, Icon, message } from 'antd';
const { Dragger } = Upload;

const props = {
  name: '',
  multiple: false,
  action: '',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

function UploadPhoto({ imageExist, action }) {
  return (
    <Dragger {...props} action={action} imageExist>
      <p className='ant-upload-drag-icon'>
        <Icon type='inbox' />
      </p>
      <p className='ant-upload-text'>
        {imageExist
          ? 'Upload new image by clicking or draging it to this area'
          : 'Click or drag image to this area to upload'}
      </p>
    </Dragger>
  );
}

export default UploadPhoto;
