import React, { Component } from 'react';

import { PixabayAPIService } from '../utils/pixabay-api';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

const pixabayAPIService = new PixabayAPIService();

export class App extends Component {
  state = {
    images: [],
    isLoadMore: false,
    isLoad: false,
    currentImage:
      'https://pixabay.com/get/g835b11d6421e2fae8f2d637cc92becc82b9106bd5c6d0300037d47df7899fc154b61fea4ad38603ac626945babadc336_640.jpg',
    showModal: true,
  };

  async componentDidMount() {
    // const data = await pixabayAPIService.fetchImages();
    // this.setState({ images: [...data] });
  }

  onSubmit = async data => {
    this.setState({ isLoadMore: false, isLoad: true });
    pixabayAPIService.resetPage();
    pixabayAPIService.query = data.query;
    const images = await pixabayAPIService.fetchImages();
    pixabayAPIService.incrementPage();
    this.setState({
      images: [...images],
      isLoadMore: pixabayAPIService.isMore(),
      isLoad: false,
    });
  };

  onLoadMore = async () => {
    this.setState({ isLoadMore: false, isLoad: true });
    const images = await pixabayAPIService.fetchImages();
    pixabayAPIService.incrementPage();
    this.setState(prevState => {
      return {
        images: [...prevState.images, ...images],
        isLoadMore: pixabayAPIService.isMore(),
        isLoad: false,
      };
    });
  };

  closeModal = () => {
    this.setState({
      currentImage: '',
      showModal: false,
    });
  };

  onShowImage = large => {
    this.setState({
      currentImage: large,
      showModal: true,
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.images}
          onShowImage={this.onShowImage}
        />
        {this.state.isLoadMore && <Button onClick={this.onLoadMore} />}
        {this.state.isLoad && <Loader />}
        {this.state.showModal && (
          <Modal
            currentImage={this.state.currentImage}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}
