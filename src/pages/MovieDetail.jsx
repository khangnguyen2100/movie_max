/* eslint-disable react-hooks/exhaustive-deps */
import { StarIcon } from "@chakra-ui/icons";
import {
  Box, Breadcrumb,
  BreadcrumbItem,
  Center, Flex, Heading, Text
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import ListFilmLayout from "src/components/Layout/ListFilmLayout";
import Loading from "src/components/Loading/Loading";
import VideoPlayer from "src/components/VideoPlayer/VideoPlayer";

import { movieDetailSelector } from "src/redux/selector";
import { getMovieDetail } from "src/services/movieDetailSlice";

export const MovieDetail = () => {
  const dispatch = useDispatch();
  const player = useRef();
  const params = useParams();
  const {id} = params;

  const { movieDetail, status } = useSelector(movieDetailSelector);

  useEffect(() => {
    dispatch(
      getMovieDetail({
        path: `movie/${id}?append_to_response=videos,images,recommendations,reviews,similar`,
        params,
      })
    );
  }, [id]);
  useEffect(() => {
  }, [movieDetail]);

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
                  <Box>{movieDetail?.release_date}</Box>
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

            <Box
              fontSize={{
                base: "sm",
                lg: "lg",
              }}
              fontWeight="medium"
            >
              <Text>{movieDetail?.overview}</Text>
            </Box>

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

          {/* video render */}
          <Box
            maxW="100%"
            w="full"
            h={'80vh'}
            overflow="hidden"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            rounded="5px"
            ref={player}
          >
            <VideoPlayer
              embedSrc={`https://www.2embed.to/embed/tmdb/movie?id=${id}`}
            />
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


