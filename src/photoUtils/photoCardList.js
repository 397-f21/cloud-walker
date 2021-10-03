import React, {useState} from 'react';
import { UpdatePhotos } from '../utilities/firebase';
import '../App.css';


export const PhotoCardList = ({photos}) => {



  console.log(photos);

  return (
    <div>
      {photos.map(photo => <Photo url={photo}/>)}
    </div>
  )
};

export const changePhotos = (location, photos, setPhotos) => {

  //TODO: Get Path


  console.log("Location: ", location);
  if (location === 'AZ'){
    const paths = ["images/AZ1.JPG", "images/AZ2.JPG"];
    UpdatePhotos(paths, photos, setPhotos);
    return;
  }

  if (location === 'CA'){
    const paths = ["images/CA1.JPG"];
    UpdatePhotos(paths, photos, setPhotos);
    return;
  }

  if (location === 'WY'){
    const paths = ["images/WY1.JPG", "images/WY2.JPG"];
    UpdatePhotos(paths, photos, setPhotos);
    return;
  }


  UpdatePhotos([], photos, setPhotos);
    
}

const Photo = ({url}) => {

  console.log("Photo: ", url);
  return (
    <img src={url} class="w-100 shadow-1-strong rounded mb-4" alt="new">
    </img>
  )
}