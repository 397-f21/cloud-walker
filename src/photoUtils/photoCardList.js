import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const PhotoCardList = ({photos}) => {
  return (
    <div class="row m-1">
      {photos.map(photo => <Photo url={photo}/>)}
    </div>
  )
};

const Photo = ({url}) => {
  return (
    <div class="col-md-6 col-sm-12 p-1">
      <img src={url} class="w-100 rounded" alt="new">
      </img>
    </div>
  )
}