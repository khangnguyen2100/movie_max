import React, { useState, useRef, memo } from "react";
import { Link } from "react-router-dom";

import { Center, Skeleton, Icon, Heading, Box } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import sliderConfig from "../../assets/images/sliderConfig/index";

const Slider = () => {
  const [sliderLoaded, setSliderLoaded] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Box mb="50px" mx="auto" maxW="full">
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
        {sliderConfig?.map((item, i) => {
          return (
            <SwiperSlide
              key={i}
              style={{
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              <Link
                to={`/detail/${item.category}/${item.id}`}
              >

                <Center
                  position="relative"
                  cursor="pointer"
                  rounded="0 0 20px 20px"
                  h="full"
                  w="full"
                >
                  <Skeleton
                    isLoaded={sliderLoaded}
                    mx="auto"
                    rounded="0 0 10px 10px"
                    overflow="hidden"
                    h="full"
                    w="full"
                    objectFit="cover"
                  >
                    <LazyLoadImage
                      src={item.src}
                      effect="blur"
                      style={{
                        minHeight: "35vh",
                        minWidth: "100vw",
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "0 0 10px 10px",
                      }}
                      afterLoad={() => setSliderLoaded(true)}
                    />
                  </Skeleton>
                  <Heading
                    position="absolute"
                    bottom={{
                      base: "25px",
                      md: "50px",
                    }}
                    left={{
                      base: "25px",
                      md: "65px",
                    }}
                    textTransform="uppercase"
                    letterSpacing="2px"
                    _hover={{ textDecoration: "underline" }}
                    color="white"
                    fontWeight="medium"
                    fontSize={{
                      base: "xl",
                      md: "2xl",
                      lg: "3xl",
                    }}
                  >
                    {item.name}
                  </Heading>
                </Center>
              </Link>
            </SwiperSlide>
          );
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
