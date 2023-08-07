import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

export default function ProductItem({ item }) {
  const { deleteProduct } = useProductContext();
  return (
    <Grid item xs={10} md={6} lg={4}>
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="300"
          image={item.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Typography variant="h6">{item.price}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => deleteProduct(item.id)}
            color="error"
            size="small"
          >
            delete
          </Button>
          <Button
            component={Link}
            to={`/edit/${item.id}`}
            color="warning"
            size="small"
          >
            edit
          </Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
