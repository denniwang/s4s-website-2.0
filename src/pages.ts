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
    title: "Programs",
    url: "/programs",
  },
  {
    title: "Playbook",
    url: "/playbook",
  },
];
export default pages;
