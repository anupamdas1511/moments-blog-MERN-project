import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts'

import Posts from './Components/Posts/Posts'
import Form from './Components/Form/Form'
import useStyles from './styles'

import memories from './images/memories.png'
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [ currentId, setCurrentId ] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Container maxWidth='lg'>
            <Navbar />
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App