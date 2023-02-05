/* eslint-disable array-callback-return */
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Center, CircularProgress, CircularProgressLabel, Heading, Icon, Image, Text } from "@chakra-ui/react";
import React, { memo, useEffect, useRef } from "react";
import { AiOutlineHeart } from 'react-icons/ai';
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { getConfigSelector, getGenresSelector, getHomSelector } from "../../redux/selector";
import { fetchHomeApi } from "../../services/getHomeSlice";
import { sortByValue } from "../../utils";

import { Autoplay, Keyboard, Lazy, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonWhite from "../Buttons/ButtonWhite";


const Slider = () => {
  const dispatch = useDispatch();
  
  const { genres } = useSelector(getGenresSelector);
  const { value, status } = useSelector(getHomSelector);
  const { config } = useSelector(getConfigSelector);
  let sortByVote
  if (status === 'done') {
    sortByVote = sortByValue(value, 'vote_average')
  }
  const handleDispatchAction = () => {
    dispatch(
      fetchHomeApi({
        path: "trending/all/week",
      })
    );
  };
  useEffect(() => {
    if (Object.keys(value).length === 0) {
      handleDispatchAction();
    }
  }, []);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Box mb="50px" mx="auto" maxW="full" h={'100vh'}>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        speed={700}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
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
        modules={[Autoplay, Pagination, Navigation, Keyboard, Lazy]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {sortByVote?.map((item, i) => {
          let subString = item?.overview.split(' ')
          if (subString.length < 25) {
            subString = item?.overview
          } else {
            subString = subString.slice(0, 25).join(' ') + ' ...'
          }
          if (i < 5) {
            return (
              <SwiperSlide
                key={i}
                style={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Center
                  position="relative"
                  cursor="pointer"
                  rounded="0 0 20px 20px"
                  h="full"
                  w="full"
                >
                  <Box
                    position='absolute'
                    top='0'
                    left='0'
                    right='0'
                    bottom='0'
                    overflow='hidden'
                  >
                    <Image
                      src={`${config?.images?.secure_base_url}/original${item.backdrop_path}`}
                      effect="blur"
                      mx="auto"
                      overflow="hidden"
                      h="full"
                      w="full"
                      opacity={'0.2'}
                      objectFit="cover"
                      style={{
                        minHeight: "35vh",
                        minWidth: "100vw",
                        height: "100%",
                        width: "100%",
                        scale: "1.3"
                      }}
                    />
                  </Box>

                  <Box pos={'relative'} layerStyle={"containerStyles"} mt='60px' maxH='calc(100vh - 60px)' maxW='calc(100vw - 120px)' overflow='hidden' px='0' zIndex={10}>
                    <Image
                      src={`${config?.images?.secure_base_url}/original${item.backdrop_path}`}
                      effect="blur"
                      zIndex={20}
                      overflow="hidden"
                      h="full"
                      w="full"
                      objectFit="cover"
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </Box>
                  {/* name, desc */}
                  <Box maxW={'500px'} pos={'absolute'} top='50%' zIndex={20} left={'100px'} transform='translateY(-50%)'>
                    <Heading
                      textTransform="uppercase"
                      letterSpacing="2px"
                      // _hover={{ textDecoration: "underline" }}
                      color="white"
                      fontWeight="bold"
                      fontSize={{
                        base: "xl",
                        md: "2xl",
                        lg: "55px",
                      }}
                    >
                      {item?.title || item?.name}
                    </Heading>
                    <Text my='25px' fontSize={'18px'}>
                      {subString}
                    </Text>
                    <Box display={'flex'} h='55px' flexGrow={'1'} alignItems='center' columnGap='4'>
                      <ButtonWhite content={'WATCH NOW'} href={`/${item?.media_type}/${item?.id}`} />
                      <Box display={'flex'} h='full' w='55px' alignItems='center' justifyContent={'center'} rounded='sm' border={'1px solid #bfbfbf'} boxShadow='xs'>
                        <AiOutlineHeart color="#fff" size={'30px'} />
                      </Box>
                      <CircularProgress value={item?.vote_average.toFixed(2)*10 || 0} color='primaryColor'>
                        <CircularProgressLabel fontWeight={'semibold'}>{item?.vote_average.toFixed(2)}</CircularProgressLabel>
                      </CircularProgress>
                    </Box>
                  </Box>
                  {/* actor,... */}
                  <Box maxW={'500px'} pos={'absolute'} bottom='50px' zIndex={20} right={'100px'}>
                    <Box textAlign='right' mb='15px'>
                      <Text fontWeight={'bold'} fontSize='18px'>Genres</Text>
                    </Box>
                    <Box display={'flex'} alignItems='center' columnGap={'6'} justifyContent={'space-between'}>
                      {
                        item?.genre_ids?.map((id,j) => {
                          const getGenreFromId = genres[item?.media_type].filter(genre => genre.id === id)
                          return (
                            <Text key={j} display='block'>
                              {getGenreFromId[0]?.name}
                            </Text>
                          )
                        })
                      }
                    </Box>
                  </Box>
                </Center>
              </SwiperSlide>
            );
          }
        })}
        <Icon
          as={ChevronLeftIcon}
          ref={prevRef}
          cursor="pointer"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          left="0"
          zIndex="10"
          color="rgba(50, 138, 241, .6)"
          boxSize={{ base: "16", md: "24", lg: "32" }}
          transition=".3s"
          _hover={{
            color: "rgba(50, 138, 241)",
            transform: "translateY(-50%) scale(1.05)",
            left: "-5px",
          }}
        />
        <Icon
          as={ChevronRightIcon}
          ref={nextRef}
          cursor="pointer"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          right="0"
          zIndex="10"
          color="rgba(50, 138, 241, .6)"
          boxSize={{ base: "16", md: "24", lg: "32" }}
          transition=".3s"
          _hover={{
            color: "rgba(50, 138, 241)",
            transform: "translateY(-50%) scale(1.05)",
            right: "-5px",
          }}
        />
      </Swiper>
    </Box>
  );
};

export default memo(Slider);
