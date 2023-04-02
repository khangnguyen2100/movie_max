/* eslint-disable array-callback-return */
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Center, CircularProgress, CircularProgressLabel, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import { AiFillHeart } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { getConfigSelector, getGenresSelector, getHomeSliderSelector } from "src/redux/selector";
import { getHomeSlider } from "src/services/getHomeSlice";
import { sortByValue } from "src/utils";
import { Autoplay, EffectCreative, Keyboard, Lazy, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonWhite from "../Buttons/ButtonWhite";

const SliderButton = memo(forwardRef(({ icon, direction = 'left' || 'right' }, ref) => {
  return (
    <Icon
      as={icon}
      ref={ref}
      cursor="pointer"
      position="absolute"
      top="50%"
      display={{ base: "none", md: "block" }}
      transform="translateY(-50%)"
      {
      ...direction === 'left' ? { left: "0" } : { right: "0" }
      }
      zIndex="10"
      color="rgba(50, 138, 241, .6)"
      boxSize={{ base: "16", md: "24", lg: "24" }}
      transition=".3s"
      _hover={{
        color: "rgba(50, 138, 241)",
        transform: "translateY(-50%) scale(1.05)",
        left: direction === 'left' ? "-5px" : "",
        right: direction === 'right' ? "-5px" : "",
      }}
    />
  )
}))

const Slider = () => {
  const dispatch = useDispatch();

  const { genres } = useSelector(getGenresSelector);
  const { data, status } = useSelector(getHomeSliderSelector);
  const { config } = useSelector(getConfigSelector);
  let sortByVote
  if (status === 'done') {
    sortByVote = sortByValue(data, 'vote_average')
  }
  useEffect(() => {
    dispatch(
      getHomeSlider({
        path: "trending/all/day",
      })
    );
  }, [dispatch]);
  // ref for swiper
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const variants = {
    show: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  }
  const sliderSettings = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 1,
    speed: 700,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    allowTouchMove: true,
    onInit: (swiper) => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    },
    keyboard: true,
    loop: false,
    rewind: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {},
    lazy: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    modules: [Autoplay, Pagination, Navigation, Keyboard, Lazy, EffectCreative],
    onSlideChange: (e) => setActiveSlide(e.realIndex)
  }

  return (
    <Box mt='55px' mx="auto" w='full' maxW="full" h={'80vh'}>
      <Swiper
        {...sliderSettings}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {sortByVote?.map((item, i) => {

          /* get short description */
          let subString = item?.overview.split(' ')
          if (subString.length < 25) {
            subString = item?.overview
          } else {
            subString = subString.slice(0, 25).join(' ') + ' ...'
          }
          if (i < 10) {
            return (
              <SwiperSlide
                key={i}
                style={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Center position="relative" h="full" w="full">
                  {/* background image */}
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
                      fallback={<Box bg={'#333'} position='absolute' inset={'0'} />}
                      objectFit="cover"
                      style={{
                        minHeight: "35vh",
                        minWidth: "100vw",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                    <Box
                      bg={'rgba(0, 0, 0, .5)'}
                      position='absolute'
                      inset={'0'}
                    />
                  </Box>
                  {/* name, desc */}
                  <Box
                    pos={'absolute'} maxW={'600px'} zIndex={20} transform={'translateY(-50%)'}
                    mx={{ base: '10px', md: 'unset' }}
                    top={{ base: '40%', md: '55%', }}
                    left={{ base: '0', md: '130px', }}
                    right={{ base: '0', md: 'unset', }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={i === activeSlide ? 'show' : 'hidden'}
                      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                      variants={variants}
                    >
                      <Heading
                        textTransform="uppercase"
                        letterSpacing="2px"
                        color="#fff"
                        fontWeight="extrabold"
                        fontSize={{
                          base: "4xl",
                          md: "4xl",
                          lg: "60px",
                        }}
                      >
                        {item?.title || item?.name}
                      </Heading>
                    </motion.div>
                    {/* description */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={i === activeSlide ? 'show' : 'hidden'}
                      transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                      variants={variants}
                    >
                      <Text my='20px' fontSize={{
                        base: '15px',
                        md: '18px',
                      }}>{subString}</Text>
                    </motion.div>
                    {/* actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={i === activeSlide ? 'show' : 'hidden'}
                      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                      variants={variants}
                    >
                      <Box
                        display={'flex'} flexGrow={'1'} alignItems='center' columnGap='4'
                        h={{base: '45px' , md: '55px'}} 
                        mt={{ base: '30%', md: '60px' }}
                      >
                        <ButtonWhite href={`/${item?.media_type}/${item?.id}`} >
                          <BsFillPlayFill size={'30px'} style={{
                            marginRight: '10px'
                          }} />
                          WATCH NOW
                        </ButtonWhite>
                        {/* <Box display={'flex'} h='full' w='55px' alignItems='center' justifyContent={'center'} rounded='sm' border={'1px solid #fff'} boxShadow='xs'>
                          <AiFillHeart color="#fff" size={'30px'} />
                        </Box> */}
                        <CircularProgress ml='20px' value={item?.vote_average.toFixed(2) * 10 || 0} color='primaryColor'>
                          <CircularProgressLabel fontWeight={'semibold'}>{item?.vote_average.toFixed(2)}</CircularProgressLabel>
                        </CircularProgress>
                      </Box>
                    </motion.div>
                  </Box>
                  {/* actor,... */}
                  <Box maxW={'500px'} pos={'absolute'} bottom='50px' zIndex={20} right={{
                    base: '0',
                    md: '130px',
                  }}
                    mx={{
                      base: '10px',
                      md: 'unset',
                    }} >
                    <motion.div
                      animate={i === activeSlide ? 'show' : 'hidden'}
                      transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
                      variants={variants}
                    >

                      <Box textAlign='right' mb='15px'>
                        <Text color={'primaryColor'} fontWeight={'bold'} fontSize='22px'>Genres</Text>
                      </Box>
                      <Box display={'flex'} alignItems='center' columnGap={'6'} justifyContent={'space-between'}>
                        {
                          item?.genre_ids?.map((id, j) => {
                            const getGenreFromId = genres[item?.media_type].filter(genre => genre.id === id)
                            return (
                              <Text key={j} display='block'>
                                {getGenreFromId[0]?.name}
                              </Text>
                            )
                          })
                        }
                      </Box>
                    </motion.div>
                  </Box>

                </Center>
              </SwiperSlide>
            );
          }
        })}
        {/* button */}
        <SliderButton icon={ChevronLeftIcon} ref={prevRef} direction="left" />
        <SliderButton icon={ChevronRightIcon} ref={nextRef} direction="right" />
      </Swiper>
    </Box>
  );
};

export default memo(Slider);
