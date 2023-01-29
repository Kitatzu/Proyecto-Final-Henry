import { Alert, Box, Pagination, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPage,
  getProductsByCategories,
} from "../../Redux/Thunks/Products";

import { getCategories } from "../../Redux/Thunks/categories";
import SearchBar from "../SearchBar/SearchBar";

import {
  filterPrice,
  filterProduct,
  setIsLog,
  setUserName,
} from "../../Redux/Slices";

import { Link } from "react-router-dom";

//import { DummyInfo } from "./DummyCards";
import CardSwipper from "../CardSwipper/CardSwipper";
import SwipperBrand from "../CardSwipper/CardBrand/SwipperBrand";
import CardCategories from "./CardCategories/CardCategories";
import { getBrands } from "../../Redux/Thunks/brand";

export default function Home() {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  const { tempProducts, isLoading } = useSelector((state) => state.products);
  const categories = useSelector((store) => store.categories.categories);
  const [filter, setFilter] = useState("Todo");
  const { isLog } = useSelector((store) => store.users);
  const { pages } = useSelector((store) => store.products);
  const [banner, setBanner] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (el) => {
    if (el.target.value !== "Todo") {
      setFilter({ ...filter, [el.target.name]: el.target.value });
      dispatch(getProductsByCategories(el.target.value));
    } else {
      setFilter({ ...filter, [el.target.name]: el.target.value });
      dispatch(getPage(1));
    }
  };
  function handlePrice(e) {
    dispatch(filterPrice({ name: e.target.name, value: e.target.value }));
    dispatch(filterProduct());
    console.log(e.target.name, e.target.value);
  }

  useEffect(() => {
    dispatch(getPage(0));
    dispatch(getPage(1));
    dispatch(getCategories());
    dispatch(getBrands());
    console.log(JSON.parse(localStorage.getItem("token")));
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      dispatch(setUserName(JSON.parse(localStorage.getItem("token")).userName));
      dispatch(setIsLog(JSON.parse(localStorage.getItem("token")).token));
    }
  }, [dispatch]);

  return (
    <Box
      sx={{
        background: theme[mode].primary,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <NavBar />
      <Box display={"flex"}>
        <SideBar />
        <Box
          sx={{
            height: "calc(100vh - 64px)",
            width: { xs: "100%", sm: "calc(100% - 80px)" },
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            padding: "10px",
          }}
        >
          {!isLog && (
            <Box padding={"20px"}>
              <Alert variant="filled" severity="warning">
                No olvides registrarte. <Link to="/login">Aqui</Link>
              </Alert>
            </Box>
          )}
          <Box
            width={"100%"}
            height={"500px"}
            minHeight="500px"
            position="relative"
            sx={{
              background: banner
                ? `url(${banner})`
                : "radial-gradient(101.77% 757.7% at 100% 43.44%, #00D4FF 0%, #090979 54.69%, #05044C 79.69%, #020024 100%)",
              borderRadius: "20px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Swiper */}
            <Box top="0px" right="0px" position="absolute" margin="20px">
              <CardSwipper />
            </Box>

            {/* cuadritos */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "max-content",
                bottom: " -100px",
                padding: "10px",
              }}
              className="container"
            >
              <Box position={"relative"} width="100%">
                <SwipperBrand setBanner={setBanner} />
              </Box>
            </Box>
          </Box>
          <Box marginTop="150px">
            <Box padding="10px" display={{ xs: "block", sm: "none" }}>
              <SearchBar />
            </Box>
            <Box width="100%" display={"flex"} gap="20px" flexWrap={"wrap"}>
              <Typography
                component="h2"
                fontSize="20px"
                sx={{ color: theme[mode].textPrimary, padding: "20px" }}
              >
                INICIO
              </Typography>
            </Box>
            <Box>
              <Box 
                display={"flex"} 
                gap="20px"
                flexWrap={"wrap"} 
                padding="20px"
              >
                <Box>
                  <Typography
                    component={"label"}
                    sx={{ color: theme[mode].textPrimary }}
                  >
                    Precio minimo:
                  </Typography>
                  <input
                    type="number"
                    defaultValue={0}
                    min="0"
                    name="min"
                    onChange={(e) => handlePrice(e)}
                    style={{
                      padding: "10px",
                      border: "none",
                      background: "#ececec",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    component={"label"}
                    sx={{ color: theme[mode].textPrimary }}
                  >
                    Precio maximo:
                  </Typography>
                  <input
                    type="number"
                    defaultValue={0}
                    min="0"
                    name="max"
                    onChange={(e) => handlePrice(e)}
                    style={{
                      padding: "10px",
                      border: "none",
                      background: "#ececec",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "30px",
                padding: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoading && <div></div>}
              {tempProducts
                ? tempProducts?.map((el, key) => {
                    return (
                      <Cards
                        key={key}
                        id={el.id}
                        img={el.img}
                        name={el.name}
                        description={el.description}
                        rating={el.rating}
                        price={el.price}
                      />
                    );
                  })
                : null}
            </Box>
            <Box
              display={"flex"}
              width="100%"
              flexWrap={"wrap"}
              justifyContent="center"
            >
              {categories
                ? categories.map((cat) => (
                    <CardCategories
                      value={cat.name}
                      img={cat.img}
                      key={cat.id}
                      id={cat.id}
                    />
                  ))
                : null}
            </Box>
            <Box
              width={"100%"}
              padding="20px"
              display={"flex"}
              justifyContent="center"
            >
              {pages ? (
                <Pagination
                  count={pages}
                  color="secondary"
                  onChange={(e) => {
                    console.log(e);

                    dispatch(getPage(e.target.innerText));
                  }}
                />
              ) : (
                <Alert severity="error">No hay stock disponible!</Alert>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
