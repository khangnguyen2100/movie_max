import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Skeleton,
  Heading,
} from "@chakra-ui/react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { movieDetailSelector } from "../../redux/selector";
import { getMovieDetail } from "../../services/movieDetailSlice";
import { StarIcon } from "@chakra-ui/icons";
import { FiPlay } from "react-icons/fi";

const FilmPreview = ({ id, category, closePreview }) => {
  const dispatch = useDispatch();
  const { movieDetail } = useSelector(movieDetailSelector);
  const [data, setData] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);
  useEffect(() => {
    setData(movieDetail);
    return () => {
      setImageLoaded(false);
      setData({});
    };
  }, [movieDetail]);
  useEffect(() => {
    dispatch(
      getMovieDetail({
        path: `movieDrama/get`,
        params: {
          category: category,
          id: id,
        },
      })
    );
    return () => {
      setImageLoaded(false);
      setData({});
    };
  }, []);
  return (
    <Modal isOpen={true} onClose={closePreview} maxWidth="900px" rounded="15px">
      <ModalOverlay />

      <ModalContent
        maxWidth="900px"
        mx="20px"
        backgroundColor={"transparent"}
        rounded="15px"
      >
        <ModalHeader mt={"15px"} zIndex={100} pos="relative">
          <Heading fontSize={"26px"}>
            {data.name} - {data.year}
          </Heading>
          <Flex mt="5px" align={"center"}>
            <Text
              color="primaryColor"
              lineHeight={"0"}
              fontWeight="bold"
              fontSize={"18px"}
            >
              {data.score}
            </Text>
            <StarIcon color="yellow" ml="5px" />
          </Flex>
        </ModalHeader>
        <ModalCloseButton mr={"15px"} mt={"15px"} zIndex={100} />
        <ModalBody maxWidth="900px" zIndex={90} rounded="15px">
          <Box
            color={"decsColor"}
            _notLast={{
              "&>*": {
                marginBottom: "20px",
              },
            }}
            zIndex="20"
            pos={"relative"}
          >
            {/* area types */}
            <Box
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "lg",
              }}
              mt="310px"
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
                  {data?.areaNameList?.map((item, i) => (
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
                  {data?.tagList?.map((item) => {
                    return (
                      <BreadcrumbItem key={item.id}>
                        <Box>{item.name}</Box>
                      </BreadcrumbItem>
                    );
                  })}
                </Breadcrumb>
              </Flex>
            </Box>
            {/* definition */}
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
                  {data?.episodeVo?.[0]?.definitionList?.map(
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
            {/* decs */}
            <Box
              fontSize={{
                base: "sm",
                lg: "lg",
              }}
              fontWeight="medium"
              layerStyle={"flexCenter"}
            >
              <Text>{data.introduction}</Text>
            </Box>
          </Box>
          {/* image  */}
          <Box
            pos="absolute"
            top={"12px"}
            left="12px"
            right="12px"
            zIndex="10"
            h="400px"
            rounded={"10px"}
            overflow={"hidden"}
            _after={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4))",
            }}
            _hover={{
              '.btnPlay' : {
                visibility : 'visible',
                opacity : '1',
                transform : 'translate(-50%, -50%)',
                transition : 'all .2s ease-in-out'
              }
            }}
          >
            <Box
              mr={3}
              className='btnPlay'
              position="absolute"
              layerStyle="absCenter"
              display="flex"
              alignItems={"center"}
              justifyContent="center"
              cursor={"pointer"}
              zIndex={110}

              visibility={'hidden'}
              opacity='0'
              transition='all .2s ease-in-out'
              transform={'translate(-50%, -25%)'}
            >
              <Link to={`/detail/${category}/${id}`}>
                <FiPlay size={45} color="#fff" />
              </Link>
            </Box>
            {!imageLoaded && (
              <Skeleton
                startColor="rgba(50,138,241,.05)"
                endColor="rgba(50,138,241,.15)"
                w="full"
                h="full"
                zIndex={100}
              ></Skeleton>
            )}
            <Image
              ref={imageRef}
              src={data?.coverHorizontalUrl}
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              style={{
                display: "block !important",
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: "90",
              }}
            />
          </Box>
        </ModalBody>

        <Box
          rounded="15px"
          position={"absolute"}
          top="0"
          left={"0"}
          right="0"
          bottom={"0"}
          w="full"
          h="full"
          bg="rgba(21, 31, 50, .4)"
          zIndex="50"
          backdropFilter="blur(20px) hue-rotate(90deg)"
        ></Box>
      </ModalContent>
    </Modal>
  );
};

export default FilmPreview;
