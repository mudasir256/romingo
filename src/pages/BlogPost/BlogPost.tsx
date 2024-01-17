import {Helmet} from "react-helmet";
import {
  Container,
  Grid,
  TextField,
  Button,
  Chip,
  Box,
  Typography,
  Divider,
  Hidden,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Footer from "../../components/Footer";
import Link from "@mui/material/Link";

import Navbar from "../../components/Navbar";
import Loader from "../../components/UI/Loader";
import FilterBar from "../../components/FilterBar";
import { LargeFilterBar } from "../../components/LargeFilterBar";
import "./blog.css";

const categoryMap = [
  {
    category: 87,
    city: "Los Angeles",
    id: "ba12d364-9b1f-48c5-9ddc-7e68b40df076",
  },
  {
    category: 90,
    city: "Palm Springs",
    id: "d4c10666-addf-47a6-9870-767518d9ebad",
  },
  {
    category: 91,
    city: "San Diego",
    id: "6f2cf61f-c769-47d9-9e46-90c5664b60b1",
  },
  {
    category: 92,
    city: "San Francisco",
    id: "82145909-13b4-4aab-be20-e0db474021c1",
  },
  {
    category: 93,
    city: "Orange County",
    id: "2714faad-9ea8-4851-9506-274710cdd51b",
  },
  {
    category: 94,
    city: "Santa Barbara",
    id: "58b23325-2016-44ef-886f-67e962dab17f",
  },
];
interface instaWindow extends Window {
  instgrm: { Embeds: any };
}

declare let window: instaWindow;

interface PostParams {
  id: string | undefined;
}

interface Post {
  id: number;
  content: {
    rendered: string;
    protected: boolean;
  };
  categories: [number];
  title: {
    rendered: string;
    protected: boolean;
  };
  tags: [number];
  _embedded: {
    ["wp:featuredmedia"]: [
      {
        link: string;
      }
    ];
  };
}

interface Tag {
  id: number;
  name: string;
}

interface Location {
  fromBlog?: boolean;
}

const BlogPost: FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation<Location>();
  const { id } = useParams<PostParams>();
  const [subscribed, setSubscribed] = useState(false);
  const [cityId, setCityId] = useState<string>("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [tags, setTags] = useState<[Tag] | undefined>(undefined);

  const loadPost = async () => {
    setLoading(true);
    const response = await fetch(
      `https://blog.romingo.com/wp-json/wp/v2/posts?slug=${id}&_embed&_fields=id,title,categories,content,tags,_links,_embedded`
    );
    const posts = await response.json();
    setPost(posts[0]);
    loadTags(posts[0].tags);
    setCity(posts[0].categories);
    setLoading(false);
    setLoaded(true);
  

  };

  const setCity = (cats: number[]) => {
    cats.every((cat) => {
      const found = categoryMap.find((el) => el.category === cat);
      if (found) {
        setCityId(found.id);
        return false;
      }
      return true;
    });
  };

  const loadTags = async (tagArr: number[] | undefined) => {
    const tagStr = tagArr ? tagArr.join(",") : "";
    const response = await fetch(
      `https://blog.romingo.com/wp-json/wp/v2/tags?include=${tagStr}&_fields=id,name`
    );
    const tags = await response.json();
    setTags(tags);
  };

  useEffect(() => {
    loadPost();
    const instaEmbed = document.createElement("script");
    instaEmbed.src = "https://www.instagram.com/embed.js";
    instaEmbed.async = true;
    const script = document.createElement("script");
    script.src =
      "https://blog.romingo.com/wp-content/plugins/wp-smushit/app/assets/js/smush-lazy-load.min.js?ver=3.9.5";
    script.async = true;
    document.body.appendChild(script);
    document.body.appendChild(instaEmbed);
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(instaEmbed);
    };
  }, []);

  useEffect(() => {
    window.instgrm && loaded && window.instgrm.Embeds.process();
  }, [window, loaded]);

  return (
    <>
      {post &&
      <Helmet>
        <title>{post?.title?.rendered}</title>
        <meta property="og:title" content={post?.title?.rendered || ''} />
        <meta property="og:description" content={post?.content?.rendered?.slice(2, 250)} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={post?._embedded['wp:featuredmedia']?.find(item => true)?.link || ''} />
        <meta property="og:site_name" content="Romingo" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      }

      <Navbar />
      <Container maxWidth="md" sx={{ mt: 11, mb: 0, minHeight: "100vh" }}>
        {loading ? (
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader size="300px" />
          </Box>
        ) : (
          post && (
            <>
              {state?.fromBlog ? (
                <Link
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                >
                  <Typography variant="h6">&#8592; More Blog Posts</Typography>
                </Link>
              ) : (
                <Link sx={{ cursor: "pointer" }} href={`/blog`}>
                  <Typography variant="h6">&#8592; More Blog Posts</Typography>
                </Link>
              )}

              <Typography
                component="h1"
                variant="h3"
                color="text.primary"
                dangerouslySetInnerHTML={{
                  __html: post.title.rendered,
                }}
                sx={{ mt: 2, mb: 3, textAlign: "center" }}
              />
              <Divider variant="middle" light sx={{ mt: 2, mb: 4 }} />
              <Box
                component="img"
                src={post?._embedded["wp:featuredmedia"]?.find(item => true)?.link}
                alt="background"
                draggable="false"
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: "450px",
                  borderRadius: "15px",
                  mb: 2,
                }}
              />
              <Divider light variant="middle" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  BOOK YOUR PET-FRIENDLY GETAWAY!
                </Typography>
              </Divider>
              <Hidden mdDown>
                <Box sx={{ mx: 'auto' }}>
                  <LargeFilterBar />
                </Box>
              </Hidden>
              <Hidden mdUp>
                <Box sx={{ mx: 'auto', maxWidth: '500px'}}>
                  <FilterBar searchOnClose={false} city={cityId} />
                </Box>
              </Hidden>
              <div className="custom-blog-post">
                <div className="post-template-default single single-post postid-1568 single-format-standard wp-custom-logo  nv-sidebar-full-width menu_sidebar_slide_right">
                  <div
                    className="nv-content-wrap entry-content"
                    id="neve_body"
                    dangerouslySetInnerHTML={{
                      __html: post.content.rendered,
                    }}
                  />
                </div>
              </div>
              {tags?.map((tag) => (
                <Chip
                  key={tag.id}
                  sx={{
                    fontSize: "12px",
                    mb: 0.25,
                    mx: 0.25,
                  }}
                  label={`#${tag.name}`}
                  onClick={() => navigate(`/blog?tag=${tag.id}`)}
                />
              ))}
              <Divider light sx={{ mt: 2, mb: 2 }} />
            </>
          )
        )}
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ pb: 6 }}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                color: "primary.main",
                textAlign: "center",
                maxWidth: "100%",
                margin: "0px auto",
              }}
            >
              Save Money &amp; Travel More
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                mb: { sm: "1rem", xs: "2rem" },
                mt: { sm: "1rem", xs: "1rem" },
                fontSize: { xs: "95%", sm: "100%" },
              }}
            >
              Sign up for Romingo Insiders and get access to exclusive rates and
              deals
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "350px",
              mx: "auto",
            }}
          >
            {subscribed ? (
              <Typography variant="body1" color="text.secondary">
                Awesome! You&apos;re subscribed to deals, tips, guides, and all
                the other great content from Romingo Insiders!
              </Typography>
            ) : (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                  fetch(
                    `https://romingo.us6.list-manage.com/subscribe/post-json?u=585083137c3540a7371e3a74f&id=d4d3932414&EMAIL=${encodeURIComponent(
                      email
                    )}&c=?`,
                    {
                      mode: "no-cors",
                      method: "POST",
                    }
                  );
                }}
              >
                <input
                  type="hidden"
                  name="u"
                  value="585083137c3540a7371e3a74f"
                />
                <input type="hidden" name="id" value="d4d3932414" />
                <div
                  className="field-shift"
                  style={{ position: "absolute", left: "-5000px" }}
                  aria-label="Please leave the following three fields empty"
                >
                  <label htmlFor="b_name">Name: </label>
                  <input
                    type="text"
                    name="b_name"
                    tabIndex={-1}
                    value=""
                    placeholder="Freddie"
                    id="b_name"
                  />
                  <label htmlFor="b_email">Email: </label>
                  <input
                    type="email"
                    name="b_email"
                    tabIndex={-1}
                    value=""
                    placeholder="youremail@gmail.com"
                    id="b_email"
                  />
                  <label htmlFor="b_comment">Comment: </label>
                  <textarea
                    name="b_comment"
                    tabIndex={-1}
                    placeholder="Please comment"
                    id="b_comment"
                  ></textarea>
                </div>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    variant="outlined"
                    type="email"
                    name="email"
                    id="MERGE0"
                    label={"Email Address"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    size="medium"
                    autoCapitalize="off"
                    autoCorrect="off"
                    sx={{ width: "calc(100% - 100px)", background: "#fff" }}
                  />
                  <Button
                    sx={{
                      fontWeight: 600,
                      ml: ".5rem",
                      maxWidth: "120px",
                      mb: "0",
                      py: 1.45,
                      fontSize: "18px",
                      textTransform: "none",
                    }}
                    variant="contained"
                    size="small"
                    type="submit"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </Box>
                <Box sx={{ textAlign: "center", mt: "1rem" }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", mb: "1rem" }}
                  >
                    Travel ideas, destination guides, special rates and
                    promotions. We promise you and your dog will
                    <FavoriteIcon
                      sx={{ fontSize: "12px", mx: 0.2, mb: -0.3 }}
                    />
                    it!
                  </Typography>
                </Box>
              </form>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default BlogPost;