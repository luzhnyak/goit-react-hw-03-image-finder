import React, { Component } from 'react';

import { PixabayAPIService } from '../utils/pixabay-api';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Container } from './App.styled';

const pixabayAPIService = new PixabayAPIService();

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoadMore: false,
    isLoad: false,
    selectedImage: {},
    showModal: false,
  };

  async componentDidUpdate(prevState) {
    if (
      prevState.query !== this.state.query ||
      this.state.page !== prevState.page
    ) {
      const { page, query } = this.state;
      pixabayAPIService.page = page;
      pixabayAPIService.query = query;
      const images = await pixabayAPIService.fetchImages();

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          isLoadMore: pixabayAPIService.isMore(),
          isLoad: false,
        };
      });
    }
  }

  onSubmit = async ({ query }) => {
    this.setState({
      query: query,
      page: 1,
      images: [],
      isLoadMore: false,
      isLoad: true,
    });
  };

  onLoadMore = async () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, isLoadMore: false, isLoad: true };
    });
  };

  closeModal = () => {
    this.setState({
      selectedImage: {},
      showModal: false,
    });
  };

  onShowImage = image => {
    this.setState({
      selectedImage: image,
      showModal: true,
    });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.images}
          onShowImage={this.onShowImage}
        />
        {this.state.isLoadMore && <Button onClick={this.onLoadMore} />}
        {this.state.isLoad && <Loader />}
        {this.state.showModal && (
          <Modal
            image={this.state.selectedImage}
            closeModal={this.closeModal}
          />
        )}
      </Container>
    );
  }
}
