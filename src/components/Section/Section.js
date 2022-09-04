import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css";

import ButtonBg from "../Buttons/ButtonBg";
import Film from "../Film/Film";
const Section = ({ data }) => {
  return (
    <Box mb="50px">
      <Flex mb="30px" justify="space-between" align="center">
        <Heading
          textTransform="capitalize"
          fontSize={{
            base: "xl",
            md: "2xl",
          }}
        >
          {data?.homeSectionName}
        </Heading>
        <Link to={`/collection/${data?.homeSectionId}`}>
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
        {data?.recommendContentVOList?.map((data, i) => {
          if (i < 18) {
            return (
              <SwiperSlide key={i}>
                <Film
                  category={data.category}
                  id={data.id}
                  score={data.score}
                  imageUrl={data.imageUrl}
                  title={data.title}
                />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </Box>
  );
};

export default memo(Section);
