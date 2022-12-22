import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles(( theme )=>({
      appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        width: '100%',
        [theme.breakpoints.down("xs")]: {
          flexDirection: 'column'
        }
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
        fontFamily: 'Lobster, cursive'
      },
      image: {
        marginLeft: '15px',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
        [theme.breakpoints.down("xs")]: {
          width: '100%'
        }
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
        [theme.breakpoints.down("sm")]: {
          width: '100%'
        }
      },
      username: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
          display: 'none'
        }
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center'
      },
      purple: {
        margin: '10px',
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        [theme.breakpoints.down('sm')]: {
          float: 'right'
        },
        [theme.breakpoints.down("xs")]: {
          display: 'none'
        }
      },
      logout: {
        [theme.breakpoints.down("xs")]: {
          width: '100%',
        }
      },
      [theme.breakpoints.down('xs')]: {
        signin: {
          width: '100%'
        }
      }
}))