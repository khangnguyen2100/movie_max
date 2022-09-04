import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Skeleton,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FilmPreview from "./FilmPreview";
const Film = ({ category, id, score, imageUrl, title }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const skeletonImg = useRef()
  const [showPreview, setShowPreview] = useState(false);
  const minHeightValue = useBreakpointValue({
    base: "30vh",
    md: "40vh",
    lg: "43vh",
  });
  const checkDevice = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleShowPreview = (e) => {
    e.preventDefault()
    setShowPreview(true);
  };
  const handleClosePreview = () => {
    setShowPreview(false);
  };
  return (
    <>
      <Link
        to={`/detail/${category}/${id}`}
      >
        <Flex
          direction="column"
          justify="space-between"
          cursor="pointer"
          _hover={{
            '.film-name' : {
              color: "primaryColor",
            },
            '.preview' : {
              visibility : 'visible',
              opacity : '1',
              transform : 'translateY(0)',
              transition : 'all .25s ease-in-out'

            } 
          }}
        >
          <Box pos={'relative'}  minH={minHeightValue}>
            <Skeleton
              isLoaded={imageLoaded}
              style={{
                borderRadius: "7px",
              }}
              startColor="rgba(50,138,241,.05)"
              endColor="rgba(50,138,241,.15)"
              minH={minHeightValue}
              h='fit-content'
              position="relative" overflow={'hidden'}
              ref={skeletonImg}
            >
              <LazyLoadImage
                src={imageUrl}
                effect="blur"
                style={{
                  borderRadius: "7px",
                  minHeight: minHeightValue,
                  objectFit: "cover",
                }}
                afterLoad={() => {
                  setImageLoaded(true)
                  skeletonImg.current.children[0].style = ''
                }}
              />
              {
                
              }
              <Box
              className="preview"

              visibility={'hidden'}
              opacity='0'
              transition='all .25s ease-in-out'
              transform={'translateY(100%)'}

              pos="absolute"
              bottom="0"
              left="0"
              right="0"
              w="full"
              bg="rgba(14, 23, 37, .7)"
              p="7px 0 "
              textAlign={"center"}
              onClick={(e) => handleShowPreview(e)}
            >
              Preview
            </Box>
            </Skeleton>
            {score && (
              <Box position="absolute" top="10px" right="10px">
                <Badge
                  bg={"bgScoreColor"}
                  fontWeight="bold"
                  fontSize="14px"
                  display="flex"
                  alignItems="center"
                  color="#fff"
                >
                  {score}
                  <StarIcon color="starColor" ml="3px" />
                </Badge>
              </Box>
            )}
          </Box>

          <Box w="full" mt="5px">
            <Text
              className="film-name"
              w="full"
              fontWeight="bold"
              fontSize={{ base: "13px", md: "15px" }}
              textTransform="capitalize"
              textAlign="center"
            >
              {title.includes("[Vietsub]")
                ? title.replace("[Vietsub]", "")
                : title}
            </Text>
          </Box>
        </Flex>
      </Link>
      {showPreview && checkDevice && (
        <FilmPreview
          id={id}
          category={category}
          showPreview={showPreview}
          closePreview={handleClosePreview}
        />
      )}
    </>
  );
};

export default Film;
