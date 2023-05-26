import { Container, Grid, Hidden, Skeleton } from "@mui/material";
import Footer from "../../components/Footer";
import Loader from "../../components/UI/Loader";

const DetailsPageSkeleton = () => {
  return (
    <>
      <Grid sx={{ background: "#feffff", scrollBehavior: "smooth" }}>
        <Hidden mdUp>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              height: { xs: "200px", sm: "300px" },
              objectFit: "cover",
              mx: "0px",
              px: 0,
              width: "100%",
            }}
          />
        </Hidden>

        <Container sx={{ mt: { xs: 0, md: 3 }, mb: { xs: 10, lg: 3 } }}>
          <Grid container spacing={2} sx={{ position: "relative" }}>
            <Grid item xs={12} sm={6}>
              <Hidden mdDown>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{
                    height: { xs: "150px", sm: "375px" },
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </Hidden>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  {
                    Array.from({ length: 4 }, (_, i: number) => (
                      <Grid item sm={6} key={i}>
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height="178px"
                          width="100%"
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
          <>
            <Skeleton
              animation="wave"
              width={250}
              height={55}
              sx={{ mt: 2, mb: 0 }}
            />
            <Skeleton
              animation="wave"
              width={330}
              height={80}
              sx={{ mt: -2 }}
            />
            <Loader size="300px" />
            <Skeleton
              animation="wave"
              width="100%"
              height={800}
              sx={{ mt: -2 }}
            />
          </>
        </Container>
      </Grid>
      <Footer />
    </>
  );
};


export default DetailsPageSkeleton;
