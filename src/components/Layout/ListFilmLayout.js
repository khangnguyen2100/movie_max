import React, {memo} from "react";
import { Flex, Box, Center } from "@chakra-ui/react";

import Film from "../Film/Film";

const ListFilmLayout = ({ listFilm }) => {
  return (
    <>
    <Flex
      mt="50px"
      display="flex"
      alignItems="flex-start"
      flexWrap="wrap"
      overflow='hidden'
      mx={{
        base: "-5px",
        md: "-7.5px",
      }}
    >
      {listFilm?.map((item) => {
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
              category={item?.category ?? item?.domainType}
              id={item?.id}
              score={item?.score}
              imageUrl={item?.imageUrl ?? item?.coverVerticalUrl}
              title={item?.name ?? item?.title}
            />
          </Box>
        );
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
