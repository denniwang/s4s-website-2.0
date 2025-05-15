import { url } from "inspector";

interface Page {
  title: string;
  url: string;
}
const pages: Page[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Pricing",
    url: "/pricing",
  },
];
export default pages;
