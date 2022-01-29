import {
  Container,
  Chip,
  Box,
  Typography,
  Divider,
  Hidden,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Link from "@mui/material/Link";

import Navbar from "../../components/Navbar";
import Loader from "../../components/UI/Loader";
import FilterBar from "../../components/FilterBar";
import { DesktopFilterBar } from "../Cities/DesktopFilterBar";
import "./post.module.css";
import "./lazyloaded.css";

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

const BlogPost: FC = () => {
  const history = useHistory();
  const { id } = useParams<PostParams>();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [tags, setTags] = useState<[Tag] | undefined>(undefined);

  const loadPost = async () => {
    setLoading(true);
    const response = await fetch(
      `https://blog.romingo.com/wp-json/wp/v2/posts/${id}?_embed&_fields=id,title,content,tags,_links,_embedded`
    );
    const posts = await response.json();
    setPost(posts);
    console.log(posts);
    loadTags(posts.tags);
    setLoading(false);
    setLoaded(true);
  };

  const loadTags = async (tagArr: number[] | undefined) => {
    const tagStr = tagArr ? tagArr.join(",") : "";
    console.log(tagStr);
    const response = await fetch(
      `https://blog.romingo.com/wp-json/wp/v2/tags?include=${tagStr}&_fields=id,name`
    );
    const tags = await response.json();
    setTags(tags);
  };

  useEffect(() => {
    loadPost();
    const instaEmbed = document.createElement("script");
    instaEmbed.src = "http://www.instagram.com/embed.js";
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
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 11, mb: 6, minHeight: "100vh" }}>
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
              <Link sx={{ cursor: "pointer" }} href="/blog">
                &#8592; More Blog Posts
              </Link>
              <Typography
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
                src={post._embedded["wp:featuredmedia"][0].link}
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
                <DesktopFilterBar />
              </Hidden>
              <Hidden mdUp>
                <FilterBar />
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
                  label={tag.name}
                  onClick={() => history.push(`/blog/${tag.id}`)}
                />
              ))}
              <Divider light variant="middle" sx={{ mt: 2, mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  BOOK YOUR PET-FRIENDLY GETAWAY!
                </Typography>
              </Divider>
              <Hidden mdDown>
                <DesktopFilterBar />
              </Hidden>
              <Hidden mdUp>
                <FilterBar />
              </Hidden>
            </>
          )
        )}
      </Container>
      <Footer />
    </>
  );
};

export default BlogPost;
