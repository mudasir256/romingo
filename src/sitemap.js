const Sitemap = require("react-router-sitemap").default;

const routes = [
  {
    path: "/",
  },
  {
    path: "/listings",
  },
  {
    path: "/details/:id",
  },
  {
    path: "/hotel/:alias",
  },
  {
    path: "/checkout*",
  },
  {
    path: "/reservation/manage",
  },
  {
    path: "/los-angeles",
  },
  {
    path: "/san-diego",
  },
  {
    path: "/orange-county",
  },
  {
    path: "/san-francisco",
  },
  {
    path: "/santa-barbara",
  },
  {
    path: "/palm-springs",
  },
  {
    path: "/about",
  },
  {
    path: "/faq",
  },
  {
    path: "/contact",
  },
  {
    path: "/romingo-score",
  },
  {
    path: "/privacy",
  },
  {
    path: "/terms-of-use",
  },
  {
    path: "/romingo-partners",
  },
  {
    path: "/list-your-property",
  },
  {
    path: "/application",
  },
  {
    path: "/blog/:tag?",
  },
  {
    path: "/blog/post/:id",
  },
];

new Sitemap(routes).build("https://romingo.com/").save("./sitemap.xml");
