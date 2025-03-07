import {Helmet} from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { FC, useState, useEffect, useMemo } from "react";
import {
  Container,
  Chip,
  Grid,
  Box,
  Typography,
  Pagination,
  Divider,
} from "@mui/material";
import Link from "@mui/material/Link";

import ScrollToTop from "../../components/ScrollToTop";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Loader from "../../components/UI/Loader";
import { slugify } from '../../services/utils'

interface BlogParams {
  tag: string | undefined;
}

interface Search {
  page?: string | undefined;
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
  const navigate = useNavigate();
  const { search } = useLocation<string | null>();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const tag = params.get('tag')
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<any>(0);
  const [page, setPage] = useState<number>(parseInt(params.get("page") || "1"));
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

  const loadPosts = async (p = page) => {
    let url = `https://blog.romingo.com/wp-json/wp/v2/posts?page=${p}&_embed&_fields=id,slug,excerpt,title,_links,_embedded`;
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
    console.log(posts)
    setPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    setPage("1")
    loadTags();
    loadPosts(1);
  }, [tag]);

  const changePage = (page: number) => {
    console.log(params)

    params.append('page', page)
    navigate({
      search: params.toString(),
    });
    setPage(page);
    loadPosts(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>Romingo Blog</title>
        <meta property="og:title" content="Romingo Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://romingo.com/static/media/logo.11150e63.png" />
        <meta property="og:site_name" content="Romingo" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

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
            Pet-friendly travel treats
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
                onClick={() => navigate(`/blog?tag=${tag.id}`)}
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
                  navigate("/blog");
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
                        onClick={() =>
                          navigate(`/blog/post/${post.slug}`, {
                            fromBlog: true,
                            postId: post.id
                          })
                        }
                        href={`/blog/post/${post.slug}`}
                        color="text.primary"
                        sx={{ textDecoration: "none" }}
                      >
                        {post?._embedded['wp:featuredmedia'] && 
                        <Box
                          component="img"
                          src={post?._embedded["wp:featuredmedia"]?.find(item => true)?.link}
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
                        }
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
                            href={`/blog/post/${post.slug}`}
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
                        <Link href={`/blog/post/${post.slug}`}>
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
            page={page}
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