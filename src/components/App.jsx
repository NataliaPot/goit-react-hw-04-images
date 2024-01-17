import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from 'Servises/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [isShowLoadMore, setIsShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(null);
  const [perPage, setPerPage] = useState(12);
  const [isShowModal, setIsShowModal] = useState(false);
  const [img, setImg] = useState(null);

  useEffect(() => {
    console.log('useEffect is called');
    const fetchData = async () => {
      if (q.trim() === '') return;
      setIsShowLoadMore(false);
      if (q.trim() === '' || page === 1) {
        setIsShowLoadMore(false);
        setImages([]);
        setTotalHits(0);
      }
      try {
        setLoading(true);
        const { hits: resultImages, totalHits } = await fetchImages(q, page);

        if (resultImages !== undefined && resultImages.length > 0) {
          setImages(prevImages => [...prevImages, ...resultImages]);

          setTotalHits(totalHits);

          const isLastPage = resultImages.length < perPage;

          if (q !== '' && isFirstPage) {
            toast.success(`Hooray! We found ${totalHits} images.`);
            setIsFirstPage(false);
            if (
              resultImages !== undefined &&
              resultImages.length > 0 &&
              resultImages.length <= perPage
            ) {
              return;
            }
          }

          setIsShowLoadMore(true);

          if (isLastPage || resultImages.length === totalHits) {
            setIsShowLoadMore(false);
            toast.warn(
              "We're sorry, but you've reached the end of search results."
            );
          }
        } else {
          setTotalHits(0);
          setImages([]);
          setIsShowLoadMore(false);
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        console.log(error.message);
        setIsShowLoadMore(false);
        setItemsPerPage(null);
        toast.error('Oops! Something went wrong. Try reloading the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q, page, perPage, isFirstPage]);

  const handleSubmit = newQ => {
    if (!newQ.trim()) {
      toast.error('Please, enter your search query');
      return;
    }

    if (newQ.trim() === q.trim() && page === 1) {
      return;
    }

    setImages([]);
    setQ(newQ);
    setPage(1);
    setTotalHits(0);
    setIsFirstPage(true);
    setIsShowLoadMore(false);
    setItemsPerPage(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleClickImage = image => {
    setImg(image);
    setIsShowModal(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} handleClickImage={handleClickImage} />
      {isShowLoadMore && <Button handleLoadMore={handleLoadMore} />}
      {loading && <Loader />}
      <ToastContainer autoClose={2500} theme="dark" />
      {isShowModal && <Modal {...img} closeModal={closeModal} />}
    </>
  );
};

export default App;
