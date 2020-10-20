import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';
import myURL from '../myURL.js';

const useStyles = makeStyles({
    card: {
        maxWidth: 550,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold'
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    media: {
        height: '100%',
        width: '100%'
    },
    button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12
    }
});

const Serie = (props) => {
    const [showData, setShowData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [RNF,setRNF]=useState(false);
    const classes = useStyles();

    useEffect(
        () => {
            async function fetchData() {
                try {
                    //console.log("https://gateway.marvel.com/v1/public/comics/" + props.match.params.id + myURL)
                    const raw = await axios.get("https://gateway.marvel.com/v1/public/series/" + props.match.params.id + myURL);
                    let show=raw.data.data.results[0];
                    // console.log(raw.data.data);
                    setShowData(show);
                    setLoading(false);
                    // console.log(show);
                } catch (e) {
                    //window.location.assign('/RNF');
                    setRNF(true);
                }
            }
            fetchData();
        },
        [props.match.params.id]
    );
    
    if(RNF){
        return <Redirect to="/RNF"></Redirect>
    }
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <Card className={classes.card} variant='outlined'>
                <CardHeader className={classes.titleHead} title={showData.title} />
                <CardMedia
                    className={classes.media}
                    component='img'
                    image={showData.thumbnail.path ? showData.thumbnail.path + "/portrait_xlarge." + showData.thumbnail.extension : noImage}
                    title='show image'
                />

                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='span'>
                        <dl>
                            <p>
                                <dt className='title'>Description:</dt>
                                {showData && showData.description ? <dd>{showData.description}</dd> : <dd>N/A</dd>}
                            </p>
                            <p>
                                <dt className='title'>Start Year:</dt>
                                {showData && showData.startYear ? <dd>{showData.startYear}</dd> : <dd>N/A</dd>}
                            </p>
                            <p>
                                <dt className='title'>End Year:</dt>
                                {showData && showData.endYear ? <dd>{showData.endYear}</dd> : <dd>N/A</dd>}
                            </p>
                            <p>
                                <dt className='title'>Rating:</dt>
                                {showData && showData.rating ? <dd>{showData.rating}</dd> : <dd>N/A</dd>}
                            </p>
                            <p>
                                <dt className='title'>Creators:</dt>
                                <br/>
                                {showData.creators.items.map((temp)=>{
                                    return(<dd key={temp.name}>{temp.name} : {temp.role}<br/></dd>)
                                })}
                            </p>
                            <p>
                                <dt className='title'>Characters:</dt>
                                <br/>
                                {showData.characters.available===0?<dd>N/A</dd>:
                                showData.characters.items.map((temp)=>{
                                    return(<Link key={temp.resourceURI} to={"/characters/"+temp.resourceURI.split("characters/")[1]}>{temp.name}<br/></Link>)
                                })}
                            </p>
                            <p>
                                <dt className='title'>Comics:</dt>
                                <br/>
                                {showData.comics.available===0?<dd>N/A</dd>:
                                showData.comics.items.map((temp)=>{
                                    return(<Link key={temp.resourceURI} to={"/comics/"+temp.resourceURI.split("comics/")[1]}>{temp.name}<br/></Link>)
                                })}
                            </p>
                        </dl>
                        <Link to='/series/page/0'>Back to all series...</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Serie;
