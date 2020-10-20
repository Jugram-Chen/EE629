import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
// import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import '../App.css';
import myURL from '../myURL.js';

const useStyles = makeStyles({
    card: {
        maxWidth: 250,
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
const ComicList = (props) => {
    // const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [showsData, setShowsData] = useState(undefined);
    const [num, setNum] = useState(props.match.params.page);
    const [RNF, setRNF] = useState(false);
    let card = null;

    useEffect(() => {
        // console.log(num);
        async function fetchData() {
            setLoading(true);
            let temp = num * 20;
            // console.log("https://gateway.marvel.com/v1/public/characters"+myURL+"offset="+ temp)
            let raw = await axios.get("https://gateway.marvel.com/v1/public/comics" + myURL + "&offset=" + temp);
            let data = raw.data.data.results;
            if (data.length === 0) {
                //window.location.assign('/RNF');
                setRNF(true);
            }
            else {
                setShowsData(data);
                setLoading(false);
            }
        }
        fetchData();
    }, [num]);

    const buildCard = (show) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <Link to={`/comics/${show.id}`}>
                            <CardMedia
                                className={classes.media}
                                component='img'
                                image={show.thumbnail.path ? show.thumbnail.path + "/portrait_xlarge." + show.thumbnail.extension : noImage}
                                title='show image'
                            />

                            <CardContent>
                                <Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
                                    {show.title}
                                </Typography>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    {/* {show.summary ? show.summary.replace(regex, '').substring(0, 139) + '...' : 'No Summary'}
                                    im summary
                                    <span>More Info</span> */}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };


    card =
        showsData &&
        showsData.map((show) => {
            return (buildCard(show));
        });

    if (RNF) {
        return <Redirect to="/RNF"></Redirect>
    }
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    }
    else {
        return (
            <div>
                {parseInt(num) === 0 ? <span></span> : <Link className='showlink2' to={'/comics/page/0'} onClick={() => setNum(parseInt(0))}>First Page</Link>}
                {parseInt(num) === 0 ? <span></span> : <Link className='showlink2' to={'/comics/page/' + parseInt(num - 1)} onClick={() => setNum(parseInt(num - 1))}>pre</Link>}
                {parseInt(num) === 2387 ? <span></span> : <Link className='showlink2' to={'/comics/page/' + parseInt(num + 1)} onClick={() => setNum(parseInt(num + 1))}>next</Link>}
                {parseInt(num) === 2387 ? <span></span> : <Link className='showlink2' to={'/comics/page/2387'} onClick={() => setNum(parseInt(2387))}>Last Page</Link>}
                <br />
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div>
        );
    }
};

export default ComicList;
