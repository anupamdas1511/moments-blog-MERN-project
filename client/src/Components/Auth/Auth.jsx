import React, { useState, useEffect } from 'react'
import { Typography, Avatar, Button, Paper, Grid, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'

function Auth() {
    const clientId = `723204850420-uui9le9tte3nl38ip1bk03a1b89kd567.apps.googleusercontent.com`
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)

    const handleSubmit = () => { }
    const handleChange = () => { }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const changeMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    useEffect(() => {
        const initClient = () => {
              gapi.auth2.init({
              clientId: clientId,
              scope: ''
            })
         }
         gapi.load('client:auth2', initClient);
     })
    const googleSuccess = async (res) => {
        console.log(res)
    }
    const googleFaliure = (error) => {
        console.log(error)
        console.log("Google Sign In Failure")
    }

    return (
        <div>
            <Container component='main' maxWidth='xs'>
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>{isSignup ? `Sign Up` : `Sign In`}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                        <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                        </Grid>
                        <GoogleLogin 
                            clientId={clientId} 
                            render={(renderProps) => (
                                <Button 
                                    className={classes.googleButton} 
                                    color='primary' 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    startIcon={<Icon />} 
                                    variant='outlined' 
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess} 
                            onFailure={googleFaliure}
                            cookiePolicy={'single_host_origin'}
                        />
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={changeMode}>
                                    {isSignup ? `Already have an account? Sign In` : `Don't have an account? Sign Up`}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Auth