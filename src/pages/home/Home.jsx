//import { Typography } from "@mui/material";

import Brands from "../../components/brands/Brands";
import Categories from "../../components/categories/Categories";
import HeroHome from "../../components/hero/HeroHome";

import Products from "../../components/products/Products";


export default function Home() {
  return (
    <div>
      <HeroHome />
     <Brands/>
     <Categories/>
     <Products/>
    </div>
  )
}
