// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Typography from "@material-ui/core/Typography";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import GitHubIcon from "@material-ui/icons/GitHub";
// import IconButton from "@material-ui/core/IconButton";

// const useStyles = makeStyles({
//   card: {
//     margin: "50px",
//     maxWidth: 345
//   },
//   media: {
//     height: 250
//   }
// });

// export default function MediaCard() {
//   <Grid container>
//   const classes = useStyles();

//   return (
//     <Card className={classes.card}>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image="./Mega.JPG"
//           title="Mega Iriantika Kasmin"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Mega Iriantika Kasmin
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             as Front End Developer
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <IconButton aria-label="add to favorites">
//           <a
//             href="https://www.linkedin.com/in/mega-iriantika-398150197/"
//             className="btn btn-outline-success"
//           >
//             {" "}
//             <LinkedInIcon />{" "}
//           </a>
//         </IconButton>
//         <IconButton aria-label="share">
//           <a
//             href="https://github.com/megakasmin"
//             className="btn btn-outline-success"
//           >
//             <GitHubIcon />
//           </a>
//         </IconButton>
//       </CardActions>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image="./Hafiz.JPG"
//           title="Hafiz Yanuar"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Hafiz Yanuar
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             as Front End Developer
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <IconButton aria-label="add to favorites">
//           <a
//             href="https://www.linkedin.com/in/mega-iriantika-398150197/"
//             className="btn btn-outline-success"
//           >
//             {" "}
//             <LinkedInIcon />{" "}
//           </a>
//         </IconButton>
//         <IconButton aria-label="share">
//           <a
//             href="https://github.com/megakasmin"
//             className="btn btn-outline-success"
//           >
//             <GitHubIcon />
//           </a>
//         </IconButton>
//       </CardActions>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image="./Adi.JPG"
//           title="Sutanto Adi Nugroho"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Sutanto Adi Nugroho
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             as Back End Developer
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <IconButton aria-label="add to favorites">
//           <a
//             href="https://www.linkedin.com/in/sutanto-adi-nugroho-75b16218a/"
//             className="btn btn-outline-success"
//           >
//             {" "}
//             <LinkedInIcon />{" "}
//           </a>
//         </IconButton>
//         <IconButton aria-label="share">
//           <a
//             href="https://github.com/SutantoAdiNugroho"
//             className="btn btn-outline-success"
//           >
//             <GitHubIcon />
//           </a>
//         </IconButton>
//       </CardActions>
//       <CardActionArea>
//         <CardMedia
//           className={classes.media}
//           image="./Apri.JPG"
//           title="Apriadi"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Apriadi
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             as Back End Developer
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <IconButton aria-label="add to favorites">
//           <a
//             href="https://www.linkedin.com/in/sutanto-adi-nugroho-75b16218a/"
//             className="btn btn-outline-success"
//           >
//             {" "}
//             <LinkedInIcon />{" "}
//           </a>
//         </IconButton>
//         <IconButton aria-label="share">
//           <a
//             href="https://github.com/SutantoAdiNugroho"
//             className="btn btn-outline-success"
//           >
//             <GitHubIcon />
//           </a>
//         </IconButton>
//       </CardActions>
//     </Card>

//   );
//   </Grid>
// }

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";

const Team = props => {
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center">
        <Container>
          <Row>
            <Col xs={12} lg={3}>
              <div className="card text-center" style={{ marginTop: "25px" }}>
                <div className="overflow">
                  <img src="./Mega2.JPG" alt="Okay" width="200px" />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">MEGA KASMIN</h4>
                  <p>as Front End Developer</p>
                  <IconButton aria-label="add to favorites">
                    {" "}
                    <a
                      href="https://www.linkedin.com/in/mega-iriantika-398150197/"
                      className="btn btn-outline-success"
                    >
                      {" "}
                      <LinkedInIcon />{" "}
                    </a>
                  </IconButton>
                  <IconButton aria-label="share">
                    <a
                      href="https://github.com/megakasmin"
                      className="btn btn-outline-success"
                    >
                      <GitHubIcon />
                    </a>
                  </IconButton>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={3}>
              <div className="card text-center" style={{ marginTop: "25px" }}>
                <div className="overflow">
                  <img src="Hafiz2.JPG" alt="Okay" width="200px" />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">HAFIZ YANUAR</h4>
                  <p>as Front End Developer</p>

                  <IconButton aria-label="add to favorites">
                    {" "}
                    <a
                      href="https://www.linkedin.com/in/hafiz-yanuar-0b359b189/"
                      className="btn btn-outline-success"
                    >
                      {" "}
                      <LinkedInIcon />{" "}
                    </a>
                  </IconButton>
                  <IconButton aria-label="share">
                    <a
                      href="https://github.com/megakasmin"
                      className="btn btn-outline-success"
                    >
                      <GitHubIcon />
                    </a>
                  </IconButton>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={3}>
              <div className="card text-center" style={{ marginTop: "25px" }}>
                <div className="overflow">
                  <img src="Adi2.JPG" alt="Okay" width="200px" />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">ADI NUGROHO</h4>
                  <p>as Back End Developer</p>

                  <IconButton aria-label="add to favorites">
                    {" "}
                    <a
                      href="https://www.linkedin.com/in/sutanto-adi-nugroho-75b16218a/"
                      className="btn btn-outline-success"
                    >
                      {" "}
                      <LinkedInIcon />{" "}
                    </a>
                  </IconButton>
                  <IconButton aria-label="share">
                    <a
                      href="https://github.com/SutantoAdiNugroho"
                      className="btn btn-outline-success"
                    >
                      <GitHubIcon />
                    </a>
                  </IconButton>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={3}>
              <div className="card text-center" style={{ marginTop: "25px" }}>
                <div className="overflow">
                  <img src="Apri2.JPG" alt="Okay" width="200px" />
                </div>
                <div className="card-body text-dark">
                  <h4 className="card-title">APRIADI</h4>
                  <p>as Back End Developer</p>
                  <IconButton aria-label="add to favorites">
                    {" "}
                    <a
                      href="https://www.linkedin.com/in/mega-iriantika-398150197/"
                      className="btn btn-outline-success"
                    >
                      {" "}
                      <LinkedInIcon />{" "}
                    </a>
                  </IconButton>
                  <IconButton aria-label="share">
                    <a
                      href="https://github.com/megakasmin"
                      className="btn btn-outline-success"
                    >
                      <GitHubIcon />
                    </a>
                  </IconButton>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Team;
