import React, { Component } from 'react';

import { PixabayAPIService } from '../utils/pixabay-api';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

const pixabayAPIService = new PixabayAPIService();

export class App extends Component {
  state = {
    images: [],
    isLoadMore: false,
    isLoad: false,
  };

  async componentDidMount() {
    const data = await pixabayAPIService.fetchImages();
    console.log(data);
    this.setState({ images: [...data] });
  }

  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery images={this.state.images} />
        {this.isLoadMore && <Button />}
        {this.isLoad && <Loader />}
      </>
    );
  }
}
