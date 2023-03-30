import React, { memo } from "react";
import { Flex, Box, Center } from "@chakra-ui/react";

import Film from "../Film/Film";
import { getConfigSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const ListFilmLayout = ({ listFilm }) => {
  const { config } = useSelector(getConfigSelector);

  return (
    <>
      <Flex
        mt="50px"
        display="flex"
        alignItems="flex-start"
        justifyContent={'center'}
        flexWrap="wrap"
        overflow='hidden'
        mx={{
          base: "-5px",
          md: "-7.5px",
        }}
      >
        {listFilm?.map((item) => {
          if (Boolean(item.backdrop_path)) {
            return (
              <Box
                key={item.id}
                w={{
                  base: "calc(33.334% - 10px)",
                  md: "calc(25% - 15px)",
                  lg: "calc(16.667% - 15px)",
                }}
                mb="50px"
                mx={{
                  base: "5px",
                  md: "7.5px",
                }}
              >
                <Film
                  baseUrl={`${config?.images?.base_url}/original/`}
                  media_type={item.media_type}
                  id={item.id}
                  vote_average={item.vote_average || 0}
                  poster_path={item.poster_path}
                  title={item.title}
                  name={item.name}
                />
              </Box>
            );
          }
          return null;
        })}

      </Flex>
      {
        listFilm?.length === 0 &&
        <Center textAlign={'center'} w='full' mt='50px' overflow='hidden' fontSize={'18px'} fontWeight='500' letterSpacing={'1.5px'}>
          Not found. Please try somethings else
        </Center>
      }
    </>

  );
};

export default memo(ListFilmLayout);
