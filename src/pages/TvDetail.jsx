
import { Box, Center, Heading, Image, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Keyboard, Lazy, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { StarIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem, Button, Flex, Stack
} from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";

import moment from "moment/moment";
import ReactPlayer from "react-player";
import ListFilmLayout from "../components/Layout/ListFilmLayout";
import Loading from "../components/Loading/Loading";
import { getConfigSelector, tvDetailSelector } from "../redux/selector";
import { getTvDetail } from "../services";

export const TvDetail = () => {
  const dispatch = useDispatch();
  const player = useRef();
  const params = useParams();
  const { id } = params;
  const { tvDetail, status } = useSelector(tvDetailSelector);
  const { config } = useSelector(getConfigSelector);
  const dateFormated = moment(tvDetail?.release_date).format("YYYY");

  const handleFindTrailerKey = useCallback(() => {
    // get youtube trailer key of not have trailer get first video
    const youtubeVideos = tvDetail?.videos?.results?.filter(
      (item) => item?.site === "YouTube"
    );
    const trailer = youtubeVideos?.find(
      (item) => item?.type === "Trailer"
    );
    if (trailer) return trailer.key;
    return youtubeVideos?.videos?.results[0]?.key;
  }, [tvDetail]);
  const trailerKey = handleFindTrailerKey();

  useEffect(() => {
    dispatch(
      getTvDetail({
        path: `tv/${id}?append_to_response=videos,recommendations,reviews,similar`,
        params,
      })
    );
  }, [id]);
  useEffect(() => {
  }, [tvDetail]);
  return (
    <Box mt={"50px"}>
      {(tvDetail?.seasons?.length > 0 && status === 'done') ? (
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
                  base: "2xl",
                  lg: "4xl",
                }}
                color="textColor"
                fontWeight="bold"
                mb={"10px"}
              >
                <BreadcrumbItem>
                  <Text textTransform="uppercase" letterSpacing="2px">
                    {tvDetail?.title || tvDetail?.name}
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
                  {tvDetail?.vote_average.toFixed(1)}
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
              <Text>{tvDetail?.overview}</Text>
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
                  {tvDetail?.spoken_languages?.map((item, i) => (
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
                  {tvDetail?.genres?.map((item) => {
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
          {/* Trailer */}
          <Box 
          overflow={'hidden'} w='full' mb='50px'
          h={{base: '60vw', md: '80vh'}}
          >
            {
              trailerKey ? (
                <ReactPlayer
                  ref={player}
                  url={`https://www.youtube.com/watch?v=${handleFindTrailerKey()}`}
                  width='100%'
                  height='100%'
                  controls
                />
              ) : (
                <Image
                  src={`${config?.images?.base_url}/original/${tvDetail?.backdrop_path}`}
                  alt={`${tvDetail?.title || tvDetail?.name} poster`}
                  objectFit='cover'
                />
              )
            }
          </Box>
          {/* season */}
          <Box>
            {tvDetail?.seasons?.map((item, i) => {
              const seasonDateFormated = moment(item?.air_date).format("MMMM Do YYYY");
              return (
                <Flex
                  key={i}
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                  borderWidth='1px'
                  borderRadius='lg'
                  p='4'
                  mb='8'
                  alignItems={'start'}
                  columnGap='8'
                  minH={'300px'}
                >
                  <Image
                    objectFit='cover'
                    display={{ base: 'none', md: 'block' }}
                    maxW={{ base: '100%', sm: '200px' }}
                    src={`${config?.images?.base_url}/original/${item.poster_path}`}
                    alt={`${item.name} poster`}
                  />

                  <Stack flexGrow={1} minH={'300px'}>
                    <Stack flexGrow={1} mt='4'>
                      <Heading
                        size='lg' display={'inline-block'} mb='2'
                      >
                        {item.name} - {seasonDateFormated || ''}
                      </Heading>
                      <Heading size={'md'} mb={'6'}>
                        {item.episode_count} episodes
                      </Heading>
                      <Text flexGrow={1} h='full' py='2' color={'decsColor'}>
                        {item.overview || `${item.name} of ${tvDetail?.title || tvDetail?.name} premiered on ${seasonDateFormated || 'N/A'}`}
                      </Text>
                    </Stack>
                    <Box display={'block'}>
                      <Link to={`/tv/${id}/season/${item.season_number}`}>
                        <Button mb='6' variant='solid' colorScheme='blue'>
                          Watch Now
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Flex>
              )
            })}
          </Box>

          {/* likeList */}
          {tvDetail?.recommendations?.results?.length > 0 && (
            <Box>
              <Heading fontSize="2xl" mt="50px">
                You may Like
              </Heading>
              <ListFilmLayout listFilm={tvDetail?.recommendations?.results} />
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


