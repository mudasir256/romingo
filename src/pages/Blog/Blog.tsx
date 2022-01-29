import {
  Container,
  Chip,
  Grid,
  Box,
  Typography,
  Pagination,
  Divider,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import { FC, useState, useEffect } from "react";

import ScrollToTop from "../../components/ScrollToTop";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Loader from "../../components/UI/Loader";

interface BlogParams {
  tag: string | undefined;
}

interface Post {
  id: number;
  date: Date;
  content: {
    rendered: string;
    protected: boolean;
  };
  title: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
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

const Blog: FC = () => {
  const history = useHistory();
  const { tag } = useParams<BlogParams>();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<any>(0);
  const [posts, setPosts] = useState<[Post] | undefined>(undefined);
  const [tagNames, setTagNames] = useState<[Tag] | undefined>(undefined);
  const [tagName, setTagName] = useState<[Tag] | undefined>(undefined);

  const loadTags = async () => {
    const response = await fetch(
      `https://blog.romingo.com/wp-json/wp/v2/tags?per_page=20&order=desc&orderby=count&_fields=id,name`
    );
    const tagsRes = await response.json();
    setTagNames(tagsRes);
  };

  const loadPosts = async (p = 1) => {
    let url = `https://blog.romingo.com/wp-json/wp/v2/posts?page=${p}&_embed&_fields=id,excerpt,title,_links,_embedded`;
    if (tag) {
      url += `&tags=${tag}`;
      const response = await fetch(
        `https://blog.romingo.com/wp-json/wp/v2/tags?include=${tag}&_fields=id,name`
      );
      const tagRes = await response.json();
      setTagName(tagRes);
    }
    setLoading(true);
    const response = await fetch(url);
    setCount(response.headers.get("x-wp-total"));
    if (!response.ok) {
      // oups! something went wrong
      return;
    }
    const posts = await response.json();
    setPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    loadTags();
    loadPosts(1);
  }, [tag]);

  const changePage = (page: number) => {
    loadPosts(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 11, mb: 6, minHeight: "100vh" }}>
        <Typography
          variant="h2"
          color="text.primary"
          sx={{ mb: 2, textAlign: "center" }}
        >
          The Romingo Blog
        </Typography>
        <Divider variant="middle" light sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Treats For Dog-Friendly Travel
          </Typography>
        </Divider>
        {tagNames && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            {tagNames?.map((tag) => (
              <Chip
                key={tag.id}
                sx={{
                  fontSize: "12px",
                  mb: 0.25,
                  mx: 0.25,
                }}
                label={`#${tag.name}`}
                onClick={() => history.push(`/blog/${tag.id}`)}
              />
            ))}
          </Box>
        )}
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
          <>
            {tagName && (
              <Chip
                size="medium"
                sx={{ fontSize: "12px", mb: 2 }}
                label={`#${tagName[0].name}`}
                onDelete={() => {
                  setTagName(undefined);
                  history.push("/blog");
                }}
              />
            )}
            <Grid container spacing={4} columnSpacing={8} sx={{ mb: 5 }}>
              {posts &&
                posts.map((post, index) => (
                  <Grid
                    xs={12}
                    md={6}
                    item
                    sx={{ display: "flex", flexGrow: 1 }}
                    key={index}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        href={`/blog/post/${post.id}`}
                        color="text.primary"
                        sx={{ textDecoration: "none" }}
                      >
                        <Box
                          component="img"
                          src={post._embedded["wp:featuredmedia"][0].link}
                          alt="background"
                          draggable="false"
                          sx={{
                            objectFit: "cover",
                            width: "100%",
                            height: "385px",
                            borderRadius: "15px",
                            boxShadow: 2,
                          }}
                        />
                      </Link>
                      <Box
                        sx={{
                          pt: 1,
                          pb: 2,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          flex: 1,
                        }}
                      >
                        <Box>
                          <Link
                            href={`/blog/post/${post.id}`}
                            color="text.primary"
                            sx={{ textDecoration: "none" }}
                          >
                            <Typography
                              variant="h3"
                              dangerouslySetInnerHTML={{
                                __html: post.title.rendered,
                              }}
                              color="text.primary"
                              sx={{
                                fontSize: { xs: "35px", md: "40px" },
                                textAlign: { xs: "center", md: "left" },
                              }}
                            />
                          </Link>
                          <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{
                              __html:
                                post.excerpt.rendered.slice(0, 200) + "...",
                            }}
                            sx={{
                              my: 0,
                              fontSize: "20px",
                            }}
                            color="text.primary"
                          />
                        </Box>
                        <Link href={`/blog/post/${post.id}`}>
                          <Typography
                            variant="body1"
                            color="primary"
                            sx={{ fontWeight: "bold" }}
                          >
                            Keep Reading
                          </Typography>
                        </Link>
                      </Box>
                      <Divider light />
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            count={Math.ceil(count / 10)}
            onChange={(_, p) => changePage(p)}
            showFirstButton
            showLastButton
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Blog;
