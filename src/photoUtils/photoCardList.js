import React from 'react';
import '../App.css';


export const PhotoCardList = ({photos}) => {
  return (
    <div>
      {photos.map(photo => <Photo url={photo}/>)}
    </div>
  )
};

const Photo = ({url}) => {
  return (
    <img src={url} class="w-100 shadow-1-strong rounded mb-4" alt="new">
    </img>
  )
}