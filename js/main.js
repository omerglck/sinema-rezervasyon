import { handleClick, moviePrice } from "./function.js";
import { elements } from "./helpers.js";

//! Olay İzleyicileri
elements.container.addEventListener("click", handleClick);

elements.select.addEventListener("change", moviePrice);
