import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from '../LogoFPT-2017-copy-3042-1513928399.jpg'

function header() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" className='bg-white'>
        <Toolbar className='bg-white'>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="logo" width={100} height={100} />
          </Typography>
          <Box>
            <Typography className='text-black'>
              giachan9@gmail.com
            </Typography>
            <Typography className='text-black'>
              0933857813
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default header