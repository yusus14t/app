import React, { useEffect, useState } from 'react'
import NO_PHOTO from "../../../assets/images/no-photo.png";
import { WEBSITE_IMAGE } from '../../../constants/constant';
import { axiosInstance, getAuthHeader, getFullPath } from '../../../constants/utils';
import useToasty from '../../../hooks/toasty';

const Website = () => {
  const [ images, setImages ] = useState([])
  const toasty = useToasty()

  useEffect(() => {
    getImages()
  }, [])

  const getImages = async () => {
    try{
      let { data } = await axiosInstance.get('/super-admin/website-images', getAuthHeader())
      setImages(data.images)
    } catch(error){ console.error(error) }
  }

  const handleImages = async ( file, id ) => {
    try{
      let formData = new FormData()
      formData.append( 'file', file )
      formData.append('id', id)
      let { data } = await axiosInstance.post('/super-admin/upload-image', formData, getAuthHeader())

      setImages( old => old.map( img => {
        if( img.id === id ) img = data.image
        return img
      }))

      toasty.success('Successfully uploaded image')
    } catch(error){ console.error(error) }
  }

  const findImage = ( id ) => {
    return images.find( img => img.id === id )
  }


  return (
    <div className={`ms-panel-body `}>
      <div className="row">
        {Object.keys(WEBSITE_IMAGE).map(imageId => <div className="col-sm-4 p-2">
          <label htmlFor={`upload-${imageId}`} className='cursor-pointer w-100'>
            <img style={{ width: "100%", height: '150px', objectFit: 'contain' }} src={findImage(imageId)?.id ? getFullPath(findImage(imageId)?.image) : NO_PHOTO} alt="" />
          </label>
          <input
            type="file"
            id={`upload-${imageId}`}
            style={{ display: "none" }}
            onChange={(e) => handleImages(e.target.files[0], imageId)}
          />
          <h6 className="text-center">{imageId}</h6>
        </div>)}
      </div>
    </div>
  );
}

export default Website