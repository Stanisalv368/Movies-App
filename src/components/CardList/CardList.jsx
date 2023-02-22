import React from "react";

import CardItem from "../CardItem";

const CardList = ({movies,like})=>{
    return (
        <React.Fragment>
            {movies.map((movieReq) => <CardItem key={movieReq.id} {...movieReq} like={like}/>)}
        </React.Fragment>
    )
}

export default CardList