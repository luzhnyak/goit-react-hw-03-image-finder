import React, { Component } from 'react';

import { PixabayAPIService } from '../utils/pixabay-api';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Container } from './App.styled';
import { Message } from './Message/Message';

const pixabayAPIService = new PixabayAPIService();

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: false,
    isLoadMore: false,
    isLoad: false,
    selectedImage: {},
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (
      (prevState.query !== query || prevState.page !== page) &&
      query !== ''
    ) {
      try {
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
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoad: false });
      }
    }
  }

  onSubmit = async ({ query }) => {
    await this.setState({
      query: '',
    });

    this.setState({
      query: query,
      page: 1,
      images: [],
      isLoadMore: false,
      isLoad: true,
      error: false,
    });
  };

  onLoadMore = () => {
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
    const {
      images,
      query,
      isLoadMore,
      isLoad,
      showModal,
      selectedImage,
      error,
    } = this.state;

    const isNotFound = images.length === 0 && query !== '' && !isLoad && !error;

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />

        {images.length !== 0 && (
          <ImageGallery images={images} onShowImage={this.onShowImage} />
        )}

        {isNotFound && (
          <Message
            text="Sorry, but we couldn't find any results for your query."
            color="blue"
          />
        )}

        {error && <Message text="Oops, something went wrong..." color="red" />}

        {isLoadMore && <Button onClick={this.onLoadMore} />}
        {isLoad && <Loader />}
        {showModal && (
          <Modal image={selectedImage} closeModal={this.closeModal} />
        )}
      </Container>
    );
  }
}
