/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPlayCircle } from "react-icons/ai";

import {
  Flex,
  Box,
  Text,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Center,
  Image,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import ListFilmLayout from "../components/Layout/ListFilmLayout";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import Loading from "../components/Loading/Loading";

import { movieDetailSelector, movieMediaSelector } from "../redux/selector";
import { getMovieDetail } from "../services/movieDetailSlice";
import { getMovieMedia } from "../services/movieMediaSlice";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = useRef();
  const params = useParams();
  const { category, id, episodeId = 0 } = params;

  const { movieDetail } = useSelector(movieDetailSelector);
  const { movieMedia } = useSelector(movieMediaSelector);
  const [episodeIndex, setEpisodeIndex] = useState(0);

  useEffect(() => {
    movieDetail?.episodeVo?.forEach((episode, i) => {
      if (+episodeId === episode.id) {
        setEpisodeIndex(i);
      }
    });
  }, [movieDetail]);
  useEffect(() => {
    dispatch(
      getMovieDetail({
        path: `movieDrama/get`,
        params,
      })
    );
  }, [id, episodeId]);
  useEffect(() => {
    if (Object.keys(movieDetail).length !== 0) {
      handleDispatchMedia();
    }
  }, [movieDetail]);

  const handleDispatchMedia = () => {
    dispatch(
      getMovieMedia({
        path: `media/previewInfo`,
        params: {
          category,
          contentId: id,
          episodeId:
            episodeId !== 0 ? episodeId : movieDetail?.episodeVo?.[0]?.id,
          definition: "GROOT_HD",
        },
      })
    );
    player?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleClickEpisode = (episodeId, index) => {
    navigate(`/detail/${category}/${id}/${episodeId}`);
    setEpisodeIndex(index);
  };

  return (
    <Box mt={"50px"}>
      {Object?.keys(movieDetail)?.length !== 0 ? (
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
                    {movieDetail.name}
                  </Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Box>{movieDetail.year}</Box>
                </BreadcrumbItem>
              </Breadcrumb>

              <Flex align={"center"}>
                <Text
                  color="primaryColor"
                  lineHeight={"0"}
                  fontWeight="bold"
                  fontSize={"18px"}
                >
                  {movieDetail.score}
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
              <Text>{movieDetail.introduction}</Text>
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
                  {movieDetail?.areaNameList?.map((item, i) => (
                    <BreadcrumbItem key={i}>
                      <Box>{item}</Box>
                    </BreadcrumbItem>
                  ))}
                </Breadcrumb>
              </Flex>
              <Flex align="center">
                <Text mr="10px" color={"textColor"}>
                  Types :
                </Text>
                <Breadcrumb separator="," spacing="3px">
                  {movieDetail?.tagList?.map((item) => {
                    return (
                      <BreadcrumbItem key={item.id}>
                        <Box>{item.name}</Box>
                      </BreadcrumbItem>
                    );
                  })}
                </Breadcrumb>
              </Flex>
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
                  Definitions :
                </Text>
                <Breadcrumb
                  separator=","
                  spacing="5px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  {movieDetail?.episodeVo?.[episodeIndex]?.definitionList?.map(
                    (definition, i) => {
                      return (
                        <BreadcrumbItem key={i}>
                          <Box
                            rounded={"5px"}
                            p="5px 15px"
                            bgColor={"bgColor"}
                            color={
                              definition.description === "1080P" &&
                              "primaryColor"
                            }
                            fontWeight={
                              definition.description === "1080P" && "600"
                            }
                          >
                            {definition.description}
                          </Box>
                        </BreadcrumbItem>
                      );
                    }
                  )}
                </Breadcrumb>
              </Flex>
            </Box>
          </Box>

          {/* video render */}
          <Box
            maxW="100%"
            w="full"
            overflow="hidden"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            rounded="5px"
            bg={'rgba(21, 31, 50, 1)'}
            ref={player}
            py='30px'
          >
            {movieMedia?.mediaUrl ? (
              <VideoPlayer
                videoSource={movieMedia?.mediaUrl}
                poster={movieDetail?.coverHorizontalUrl}
                subtitlesLink={
                  movieDetail?.episodeVo[episodeIndex].subtitlingList
                }
                definitionList={
                  movieDetail?.episodeVo[episodeIndex].definitionList
                }
                handleClickEpisode={handleClickEpisode}
              />
            ) : (
              <Flex justifyContent={'center'} flexDirection={['column', 'column', 'row']} alignItems='center' h={'70vh'} w='full'>
                <Box mb={['25px', '25px', '0']} flex={['0', '0', '1']} h='full' w={'full'}>
                  <Image fit={'contain'} h='full' w={'full'} src='/images/no-data.png' />
                </Box>
                {/* content */}
                <Box fontWeight={'600'} px={['4', '4', '0']} fontSize={['18px', '18px', '22px']} maxW='470px' mx={['0', '0', '25px']}>
                  <Text mb='10px'>
                    Something went wrong and the file can't be found.
                  </Text>
                  <Text>
                    Please try again later.
                  </Text>
                </Box>
              </Flex>

            )
            }
          </Box>

          {/* episodes */}
          {movieDetail?.episodeCount > 1 && (
            <Box>
              <Heading fontSize="2xl" mt="50px">
                Episodes
              </Heading>
              <Flex
                mt="50px"
                ml={{
                  base: "0",
                  lg: "30px",
                }}
                align="center"
                flexWrap="wrap"
              >
                {movieDetail?.episodeVo?.map((item, i) => {
                  let content = item.seriesNo;

                  if ((i === 0 && episodeId === 0) || +episodeId === item.id) {
                    content = <AiFillPlayCircle size={"24"} />;
                  }
                  return (
                    <Flex
                      onClick={() => handleClickEpisode(item.id, i)}
                      key={item.id}
                      justify="center"
                      align={"center"}
                      rounded={"5px"}
                      cursor={"pointer"}
                      bg="primaryColor"
                      color="textColor"
                      fontSize={"xl"}
                      fontWeight="bold"
                      boxShadow={
                        "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
                      }
                      h={{
                        base: "45px",
                        md: "55px",
                      }}
                      w={{
                        base: "45px",
                        md: "55px",
                      }}
                      mr={{
                        base: "15px",
                        md: "25px",
                      }}
                      mb={{
                        base: "15px",
                        md: "25px",
                      }}
                      transition=".25s"
                      _hover={{
                        transform: "translateY(-5px) ",
                        transition: ".25s",
                      }}
                    >
                      {content}
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          )}

          {/* refList */}
          {movieDetail?.refList?.length > 0 && (
            <Box>
              <Heading fontSize="2xl" mt="50px">
                Related Series
              </Heading>
              <ListFilmLayout listFilm={movieDetail?.refList} />
            </Box>
          )}

          {/* likeList */}
          <Box>
            <Heading mt="50px" fontSize="2xl">
              'You may Like'
            </Heading>
            <ListFilmLayout listFilm={movieDetail?.likeList} />
          </Box>
        </Box>
      ) : (
        <Center mt="50px">
          <Loading />
        </Center>
      )}
    </Box>
  );
};

export default Detail;
