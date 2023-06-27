/* eslint-disable react-hooks/exhaustive-deps */
import { StarIcon } from "@chakra-ui/icons";
import {
  Box, Breadcrumb,
  BreadcrumbItem,
  Center, Flex, Grid, GridItem, Heading, Select, Text, Tooltip
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import Loading from "../components/Loading/Loading";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

import { tvDetailSelector } from "../redux/selector";
import { getTvDetail } from "../services";

export const TvSeason = () => {
  const dispatch = useDispatch();
  const player = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const { id, seasonId } = params;

  const { seasonDetail, tvDetail, status } = useSelector(tvDetailSelector);
  const [episodeNum, setEpisodeNum] = useState(1);
  const handleChangeEpisode = (num) => {
    setEpisodeNum(num);
  };
  const handleChangeSeason = (e) => {
    navigate(`/tv/${id}/season/${e.target.value}`)
  };
  useEffect(() => {
    dispatch(
      getTvDetail({
        path: `tv/${id}/season/${seasonId}`,
        params,
      })
    );
  }, [id, seasonId, episodeNum]);
  return (
    <Box mt={"50px"}>
      {(seasonDetail?.episodes?.length > 0 && status === 'done') ? (
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
                  base: "2xl",
                  lg: "4xl",
                }}
                color="textColor"
                fontWeight="bold"
                mb={"10px"}
              >
                <BreadcrumbItem>
                  <Text textTransform="uppercase" letterSpacing="2px">
                    {seasonDetail?.title || seasonDetail?.name}
                  </Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Box>{moment(seasonDetail?.episodes[episodeNum - 1]?.air_date).format("YYYY")}</Box>
                </BreadcrumbItem>
              </Breadcrumb>
              <Flex align={'center'} columnGap='4'>
                <Text fontSize={{ base: '17px', md: "20px" }} color='white' fontWeight={'600'}>
                  <span style={{
                    fontWeight: 'bold',
                    color: 'rgba(120, 144, 156,1)'
                  }}>Episode: </span>
                  {seasonDetail?.episodes[episodeNum - 1]?.name}
                </Text>
                <Flex align={"center"}>
                  <Text
                    color="primaryColor"
                    lineHeight={"0"}
                    fontWeight="bold"
                    fontSize={"18px"}
                  >
                    {seasonDetail?.episodes[episodeNum - 1]?.vote_average?.toFixed(1)}
                  </Text>
                  <StarIcon color="yellow" ml="5px" />
                </Flex>
              </Flex>

            </Box>

            <Box
              fontSize={{
                base: "sm",
                lg: "lg",
              }}
              fontWeight="medium"
            >
              <Text>{seasonDetail?.episodes[episodeNum - 1]?.overview}</Text>
            </Box>
          </Box>

          {/* video render */}
          <Box
            maxW="100%"
            w="full"
            h={{ base: '60vw', md: '80vh' }}
            overflow="hidden"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            rounded="5px"
            ref={player}
          >
            <VideoPlayer
              embedSrc={`https://www.2embed.cc/embed/tmdb/tv?id=${id}&s=${seasonId}&e=${episodeNum}`}
            />
          </Box>
          {/* seasons */}
          {
            tvDetail?.seasons && (
              <Select
                mt={'30px'} w='45%' placeholder='Select option'
                onChange={handleChangeSeason}
              >
                {tvDetail?.seasons?.map(item => {
                  return (
                    <option
                      value={item.season_number}
                      // eslint-disable-next-line eqeqeq
                      selected={item.season_number == seasonId}
                    >
                      {item.name}
                    </option>
                  )
                })}
              </Select>
            )
          }

          {/* episodes */}
          {
            seasonDetail?.episodes?.length > 0 && (
              <Box>
                <Heading mb={8} fontSize="2xl" mt="50px">
                  Episodes
                </Heading>
                <Grid
                  display={'grid'} align={'center'} wrap='wrap' gap={'5'}
                  templateColumns={{
                    base: 'repeat(2, 1fr)',
                    md: `repeat(${seasonDetail?.episodes.length > 30 ? '5' : '4'}, 1fr)`
                  }}
                >
                  {
                    seasonDetail?.episodes?.map((item, i) => {
                      return (
                        <GridItem
                          width='full'
                          display={'flex'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          key={i}
                          px='3'
                          bg={episodeNum === i + 1 ? 'primaryColor' : 'rgba(21, 31, 50, 1)'}
                          color={'white'}
                          textAlign={'center'}
                          h={'50px'}
                          rounded="5px"
                          cursor={'pointer'}
                          overflow={'hidden'}
                          onClick={() => handleChangeEpisode(i + 1)}
                        >
                          <Tooltip label={item?.name}>
                            <Text
                              w={'max-content'}
                              whiteSpace={'nowrap'}
                              fontSize={{
                                base: '14px',
                                md: '16px'
                              }}
                              overflow={'hidden'}
                              textOverflow={'ellipsis'}
                            >
                              <span style={{
                                fontWeight: '700',
                                fontSize: '18px',
                              }}>{i + 1}. </span>
                              {item?.name}
                            </Text>
                          </Tooltip>
                        </GridItem>
                      )
                    })
                  }
                </Grid>
              </Box>
            )
          }
        </Box>
      ) : (
        <Center mt="50px">
          <Loading />
        </Center>
      )}
    </Box>
  );
};


