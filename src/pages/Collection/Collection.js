import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { getHomSelector } from "../../redux/selector";
import ListFilmLayout from "../../components/Layout/ListFilmLayout";
const Collection = () => {
  const getHomeData = useSelector(getHomSelector);
  const [data, setData] = useState({});
  let { homeSectionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getHomeData?.value?.recommendItems?.forEach((arr, i) => {
      if (arr.homeSectionId === +homeSectionId) {
        setData(arr);
      }
    });
  }, [getHomeData]);
  return (
    <Box>
      <Breadcrumb
        mt="30px"
        spacing="5px"
        separator={<ChevronRightIcon color="gray.500" />}
        mb="10px"
        fontWeight={"bold"}
        fontSize={{
          base: "md",
          md: "xl",
        }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => navigate("/")}
            _hover={{ textDecoration: "underline" }}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem  _hover={{ textDecoration: "underline" }} isCurrentPage>
          <BreadcrumbLink>
            {data?.homeSectionName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <ListFilmLayout listFilm={data?.recommendContentVOList} />
    </Box>
  );
};

export default Collection;
