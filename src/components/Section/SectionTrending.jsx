import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css";
import {motion} from 'framer-motion'

import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const SectionTrending = ({ data = [], name, trendingInWeek, setTrendingInWeek }) => {
  const { config } = useSelector(getConfigSelector);
  const variants = {
    week: {left: 0},
    day: {left: '50%'},
  }
  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };
  
  return (
    <Box mb="50px">
      <Flex mb="30px" justify="space-between" align="center">
        <Flex justify={'center'} align='center' columnGap={'8'}>
        {/* heading */}
          <Box>
            <Heading
              textTransform="capitalize"
              fontSize={{
                base: "xl",
                md: "2xl",
                lg: "3xl",
              }}
            >
              {data?.homeSectionName || name}
            </Heading>
          </Box>
          {/* change time */}
          <Flex 
            overflow={'hidden'}
            display={{base: 'none', md: 'flex'}}
            rounded='3xl'
            border={'rgba(50, 138, 241, 1) 1px solid'} 
            justify={'space-between'} align='center'
            w={'234px'} py='5px'
            fontWeight='bold' color='#fff' position='relative' cursor='pointer' textAlign={'center'}
          >
            <motion.div
              initial='week'
              variants={variants}
              transition={spring}
              animate={trendingInWeek ? 'week' : 'day'}
              style={{ position: 'absolute', top: 0, height: '100%' , width: '50%' }}
            >
              <Box rounded='3xl' w='full' h='full' bg={'primaryColor'} zIndex='0'></Box>
            </motion.div>
            {/* This Week */}
            <Box
              w={'50%'}
              onClick={() => setTrendingInWeek(prev => !prev)}
            >
              <Box color={trendingInWeek ? '#fff' : 'primaryColor'} pos={'relative'} bg='transparent' zIndex={1}>
                This Week
              </Box>
            </Box>

            {/* Today */}
            <Box
              w={'50%'}
              onClick={() => setTrendingInWeek(prev => !prev)}
            >
              <Box pos={'relative'} color={trendingInWeek ? 'primaryColor' : '#fff'} bg='transparent' zIndex={1}>
                Today
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Link to={`/trending/${trendingInWeek ? 'week' : 'day'}`}>
          <ButtonBg>
            More
            <ArrowForwardIcon ml={2} />
          </ButtonBg>
        </Link>
      </Flex>

      <Swiper
        slidesPerView={3.2}
        spaceBetween={15}
        breakpoints={{
          768: {
            slidesPerView: 4.3,
          },
          922: {
            slidesPerView: 6.3,
          },
        }}
        keyboard={true}
        modules={[Keyboard]}
      >
        {data?.map((data, i) => {
          if (i < 18) {
            return (
              <SwiperSlide key={data.id}>
                <Film
                  baseUrl={`${config?.images?.base_url}/original/`}
                  media_type={data.media_type}
                  id={data.id}
                  vote_average={data.vote_average}
                  poster_path={data.poster_path}
                  title={data.title}
                  name={data.name}
                />
              </SwiperSlide>
            );
          }
          return <Fragment key={data.id || i}></Fragment>;
        })}
      </Swiper>
    </Box>
  );
};

export default memo(SectionTrending);
