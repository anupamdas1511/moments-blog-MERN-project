import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core'
import useStyles from './styles'
import decode from 'jwt-decode'
import hourglass from '../../images/hourglass.png'

import './Navbar.css'

function Navbar() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // console.log(user)

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        history.push('/')
        setUser(null)
    }


    useEffect(() => {
        const token = user?.token

        //...JWT 
        // if token expire then logout
        if(token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime() ) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Moments</Typography>
                <img id='image' className={classes.image} src={hourglass} alt="memories" height={60} />
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src ={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.username} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button className={classes.signin} component={ Link } to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar