import  { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box } from '@mui/material';
import { getRefList } from '../../../redux/action/dcservice';
import { getValuesByName } from '../../../Common/Common';

let getsessionId = sessionStorage.getItem("sessionID")

export const DataCenter = () => {
  const [refTeam, setRefTeam] = useState<any>()


  useEffect(() => {
    const getreflist = async () => {
      try {
        await getRefList("refTenants;refTeam;refDeviceFilter;refCustomFilter;refTags").then((resp) => {
          if (resp) {
            let parsedata = JSON.parse(resp.data.jsonString)
            console.log("responde", parsedata)
            let refteam = getValuesByName(parsedata, "refTeam")
            setRefTeam(refteam)
            console.log('refteam', refteam)
          }
        })
      } catch (error) {
        console.log('erroe while fetch refteam')
      }
    }
    getreflist()
  }, [getsessionId])

  return (
    <div className='dc-container'>

      <Box className='form-box'>


        <FormControl variant='outlined' fullWidth sx={{ mt: 2, height: 'auto' }}>
          <InputLabel className='select-label' shrink>Tenants</InputLabel>
          <Select
            displayEmpty

            className='nz-searchcombo'
            MenuProps={{
              PaperProps: {
                className: 'select-dropdown',

              },
            }}
            // renderValue={}
            input={
              <OutlinedInput
                notched
                label={`Tenants`}
                className='select-input'
              />
            }
          >
            <MenuItem className='select-menu-item'>1</MenuItem>


          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mt: 2, height: 'auto' }}>
          <InputLabel className='select-label' shrink>
            Team
          </InputLabel>
          <Select
            displayEmpty
            className='nz-searchcombo'
            renderValue={(selected) => {
              if (!selected) {
                return <h1 className="select-menu-item">All</h1>;
              }
              return selected as string;
            }}
            MenuProps={{
              PaperProps: {
                className: 'select-dropdown',

              },
            }}
            input={
              <OutlinedInput
                notched
                label={`Team`}
                className='select-input'
              />
            }
          >
            {/* {refTeam.map((team: any) => (
              <MenuItem key={team} value={team} className="select-menu-item">
                {team}
              </MenuItem> */}
            {/* ))} */}
            
      <MenuItem>1</MenuItem>

          </Select>
        </FormControl>

        <FormControl variant='outlined' fullWidth sx={{ mt: 2, height: 'auto' }}>
          <InputLabel className='select-label' shrink>Filter</InputLabel>
          <Select
            displayEmpty

            className='nz-searchcombo'
            MenuProps={{
              PaperProps: {
                className: 'select-dropdown',

              },
            }}
            // renderValue={}
            input={
              <OutlinedInput
                notched
                label={`filter`}
                className='select-input'
              />
            }
          >
            <MenuItem className='select-menu-item'>1</MenuItem>
            <MenuItem className='select-menu-item'>2</MenuItem>
            <MenuItem className='select-menu-item'>3</MenuItem>

          </Select>
        </FormControl>

      </Box>

    </div>
  )
}
