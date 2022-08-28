import React, {memo} from "react";
import { Flex, Box } from "@chakra-ui/react";

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
      <Flex justify={'center'} align='center'overflow='hidden'>
        Not Found ^_^
      </Flex>
      }
    </>

  );
};

export default memo(ListFilmLayout);
