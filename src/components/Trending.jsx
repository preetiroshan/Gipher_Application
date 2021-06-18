import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from '@material-ui/icons/StarBorder';
import Grid from "@material-ui/core/Grid";

// import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
// import { Typography } from 'antd';
// import Typography from "@material-ui/core/Typography";
// import { useEffect } from 'react';
import "./Components.css";
// import { addToFavouriteApi } from "../services/addToFavourites";
// import { IconButton } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export default function Trending(props) {
	const classes = useStyles();
	const [trending, setTrending] = useState([]);
	useEffect(() => {
		fetch(
			"https://api.giphy.com/v1/gifs/search?api_key=5Zrre3drtzoQT2haZQ4OwPPyHyK23hqd&q=latest&limit=24&offset=0&rating=g&lang=en"
		)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				setTrending(data.data);
				return data;
			});
	}, []);

	return (
		<div
			className="section"
			style={{ maxWidth: "100%", overflow: "hidden",  marginRight:"1.3em"}}
		>
			<h1 style={{color: "white", margin:"5vh", marginLeft: "1em"}}>
				Trending
				<span
					style={{
						textAlign: "end",
						marginTop: "-30px",
						cursor: "pointer",
					}}
				>
				</span>
			</h1>
			<Grid container spacing={0} className="p-4">
				{trending.map((item) => (
					<Grid item xs={6} sm={4} md={3} lg={3} key={item.images.original.url}>
						<div className="container">
							<div className="imageSet">
              <img src={item.images.original.url} alt="hey"  />
							{/* <i
								className="fas fa-heart"
								onClick={() => {
									addToFav(item.images.original.url);
								}}
							></i> */}
                  <StarIcon className="fas fa-heart text-dark fill-red" color="primary"
                  style={{background:
                    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'}}
                  onClick={() => {
                  props.addToFav(item.images.original.url);
                  
								}} />
                
              </div>
						</div>
					
					</Grid>
				))}
			</Grid>
		</div>
	);
}
