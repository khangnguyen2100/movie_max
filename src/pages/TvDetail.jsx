
import { Box, Center, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Keyboard, Lazy, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { StarIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem, Button, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs
} from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";

import moment from "moment/moment";
import ReactPlayer from "react-player";
import ListFilmLayout from "../components/Layout/ListFilmLayout";
import Loading from "../components/Loading/Loading";
import { movieDetailSelector, getConfigSelector } from "../redux/selector";
import { getMovieDetail } from "../services/movieDetailSlice";

export const TvDetail = () => {
  const dispatch = useDispatch();
  const player = useRef();
  const params = useParams();
  const { id } = params;
  const [focusImage, setFocusImage] = useState({});
  const { movieDetail, status } = useSelector(movieDetailSelector);
  const { config } = useSelector(getConfigSelector);
  const dateFormated = moment(movieDetail?.release_date).format("YYYY");
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    dispatch(
      getMovieDetail({
        path: `tv/${id}?append_to_response=videos,images,recommendations,reviews,similar`,
        params,
      })
    );
  }, [id]);
  useEffect(() => {
  }, [movieDetail]);
  const handleFoundImage = (image, type) => {
    setFocusImage({
      data: image,
      type,
    });
    onOpen();
  }
  return (
    <Box mt={"50px"}>
      {status === 'done' ? (
        <Box>
          {/* info  */}
          <Box
            color={"decsColor"}
            _notLast={{
              "&>*": {
                marginBottom: "20px",
              },
            }}
          >
            {/* date */}
            <Box>
              <Breadcrumb
                separator={"  -  "}
                fontSize={{
                  base: "xl",
                  lg: "2xl",
                }}
                color="textColor"
                fontWeight="bold"
                mb={"10px"}
              >
                <BreadcrumbItem>
                  <Text textTransform="uppercase" letterSpacing="2px">
                    {movieDetail?.title || movieDetail?.name}
                  </Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Box>{dateFormated}</Box>
                </BreadcrumbItem>
              </Breadcrumb>

              <Flex align={"center"}>
                <Text
                  color="primaryColor"
                  lineHeight={"0"}
                  fontWeight="bold"
                  fontSize={"18px"}
                >
                  {movieDetail?.vote_average.toFixed(1)}
                </Text>
                <StarIcon color="yellow" ml="5px" />
              </Flex>
            </Box>
            {/* overview */}
            <Box
              fontSize={{
                base: "sm",
                lg: "lg",
              }}
              fontWeight="medium"
            >
              <Text>{movieDetail?.overview}</Text>
            </Box>
            {/* area & genres */}
            <Box
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "lg",
              }}
            >
              <Flex align="center">
                <Text color={"textColor"} mr="10px">
                  Area :
                </Text>
                <Breadcrumb
                  separator=","
                  spacing="3px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  {movieDetail?.spoken_languages?.map((item, i) => (
                    <BreadcrumbItem key={i}>
                      <Box>{item?.name}</Box>
                    </BreadcrumbItem>
                  ))}
                </Breadcrumb>
              </Flex>
              <Flex align="center">
                <Text mr="10px" color={"textColor"}>
                  Types :
                </Text>
                <Breadcrumb separator="," spacing="3px">
                  {movieDetail?.genres?.map((item) => {
                    return (
                      <BreadcrumbItem key={item.id}>
                        <Link to={`genres/${item.id}`}>{item.name}</Link>
                      </BreadcrumbItem>
                    );
                  })}
                </Breadcrumb>
              </Flex>
            </Box>
          </Box>
          {/* Images, videos */}
          <Tabs my={'50px'} isFitted variant='enclosed' defaultIndex={1}>
            <TabList mb='1em'>
              <Tab fontWeight={'600'}>Videos ({movieDetail?.videos?.results?.length})</Tab>
              <Tab fontWeight={'600'}>Backdrops ({movieDetail?.images?.backdrops?.length})</Tab>
              <Tab fontWeight={'600'}>Posters ({movieDetail?.images?.posters?.length})</Tab>
            </TabList>
            <TabPanels>
              <TabPanel h={'80vh'}>
                {/* Videos */}
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  speed={700}
                  keyboard={true}
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  lazy={true}
                  modules={[Autoplay, Pagination, Keyboard, Lazy]}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {
                    movieDetail?.videos?.results?.map((item, i) => {
                      return (
                        <SwiperSlide
                          key={i}
                          style={{
                            position: "relative",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <ReactPlayer
                            ref={player}
                            url={`https://www.youtube.com/watch?v=${item.key}`}
                            width='100%'
                            height='100%'
                            controls
                          />
                        </SwiperSlide>
                      );
                    })
                  }
                </Swiper>
              </TabPanel>
              <TabPanel h={'80vh'}>
                {/* Backdrops */}
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  speed={700}
                  keyboard={true}
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  lazy={true}
                  modules={[Autoplay, Pagination, Keyboard, Lazy]}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {
                    movieDetail?.images?.backdrops?.map((item, i) => {
                      return (
                        <SwiperSlide
                          key={i}
                          style={{
                            position: "relative",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <Image
                            onClick={() => handleFoundImage(item, 'backdrops')}
                            src={`${config?.images?.base_url}/original/${item.file_path}`}
                            alt={item.file_path}
                            width='100%'
                            objectFit={'cover'}
                            height='100%'
                          />
                        </SwiperSlide>
                      );
                    })
                  }
                </Swiper>
              </TabPanel>
              <TabPanel h={'80vh'}>
                {/* Posters */}
                <Swiper
                  spaceBetween={10}
                  slidesPerView={3}
                  speed={700}
                  keyboard={true}
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  lazy={true}
                  modules={[Autoplay, Pagination, Keyboard, Lazy]}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {
                    movieDetail?.images?.posters?.map((item, i) => {
                      return (
                        <SwiperSlide
                          key={i}
                          style={{
                            position: "relative",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <Image
                            onClick={() => handleFoundImage(item, 'posters')}
                            src={`${config?.images?.base_url}/original/${item.file_path}`}
                            alt={item.file_path}
                            aspectRatio={item.aspect_ratio}
                            width='100%'
                            objectFit={'cover'}
                            height='100%'
                          />
                        </SwiperSlide>
                      );
                    })
                  }
                </Swiper>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* Images modal */}
          {focusImage.data && (
            <Modal
              isCentered
              allowPinchZoom
              preserveScrollBarGap
              onClose={onClose}
              isOpen={isOpen}
              motionPreset='slideInBottom'
              size={focusImage.type === 'backdrops' ? '6xl' : 'md'}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Image
                    src={`${config?.images?.base_url}/original/${focusImage.data.file_path}`}
                    alt={focusImage.data.file_path}
                    aspectRatio={focusImage.data.aspect_ratio}
                    objectFit={'cover'}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}

          {/* season */}
          <Box>
            {movieDetail?.seasons?.map((item, i) => {
              const seasonDateFormated = moment(item?.air_date).format("MMMM DD, YYYY");
              return (
                <Flex
                  key={i}
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                  borderWidth='1px'
                  borderRadius='lg'
                  mb='8'
                  alignItems={'start'}
                  columnGap='8'
                  minH={'300px'}
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={`${config?.images?.base_url}/original/${item.poster_path}`}
                    alt={`${item.name} poster`}
                  />

                  <Stack flexGrow={1} minH={'300px'}>
                    <Stack flexGrow={1} mt='4'>
                      <Heading 
                        _hover={{
                          color: 'primaryColor',
                        }} 
                        size='lg' display={'inline-block'} mb='2'
                      >
                        {item.name}
                      </Heading>
                      <Heading size={'md'} mb={'6'}>
                        {item?.air_date} | {item.episode_count} episodes
                      </Heading>
                      <Text flexGrow={1} h='full' py='2' color={'decsColor'}>
                        {item.overview || `${item.name} of ${movieDetail?.title || movieDetail?.name} premiered on ${seasonDateFormated || 'N/A'}`}
                      </Text>
                    </Stack>
                    <Box display={'block'}>
                      <Button mb='6' variant='solid' colorScheme='blue'>
                        <Link to={`/season/${item?.season_number || i + 1}/episode/1`}>
                          Watch Now
                        </Link>
                      </Button>
                    </Box>
                  </Stack>
                </Flex>
              )
            })}
          </Box>

          {/* likeList */}
          {movieDetail?.recommendations?.results?.length > 0 && (
            <Box>
              <Heading fontSize="2xl" mt="50px">
                You may Like
              </Heading>
              <ListFilmLayout listFilm={movieDetail?.recommendations?.results} />
            </Box>
          )}

        </Box>
      ) : (
        <Center mt="50px">
          <Loading />
        </Center>
      )}
    </Box>
  );
};


