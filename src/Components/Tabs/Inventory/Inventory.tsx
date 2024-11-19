import React from 'react'
import { FormControl,InputLabel,Select,OutlinedInput,MenuItem, Box } from '@mui/material'

export const Inventory = () => {
  return (
    <div className='In-Container'>
        <Box
        component="form"
        className='form-box'
      >
       <FormControl fullWidth variant="outlined" sx={{ mt: 2, height: 'auto' }}>
              <InputLabel className='select-label' shrink>
                Type
              </InputLabel>
              <Select
                displayEmpty
                // value={selectedEqType}
                className='nz-searchcombo'
                // onChange={handleEqTypeChange}
                input={
                  <OutlinedInput
                    notched
                    label={`Type`}
                    className='select-input'
                  />
                }
                // renderValue={(selected) => {
                //   if (!selected) {
                //     return <h1 className="select-menu-item">All</h1>;
                //   }
                //   return selected as string;
                // }}
                MenuProps={{
                  PaperProps: {
                    className: 'select-dropdown', 
        
                  },
                }}
              >
                
                  {/* <MenuItem value="">
                    <h1 className="select-menu-item">All</h1>
                  </MenuItem> */}
                
               
                    <MenuItem
                      // key={eqtype.eqType}
                      // value={eqtype.eqType}
                      className="select-menu-item"
                    >
                      {/* {eqtype.eqType} */}
                      1
                    </MenuItem>
                
                 
                  {/* <MenuItem disabled className="select-menu-item">
                    No Equipment Types Available
                  </MenuItem> */}
                
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ mt: 2, height: 'auto' }}>
              <InputLabel className='select-label' shrink>
              Tenant 
              </InputLabel>
              <Select
                displayEmpty
                // value={selectedEqType}
                className='nz-searchcombo'
                // onChange={handleEqTypeChange}
                input={
                  <OutlinedInput
                    notched
                    label={`Tenant`}
                    className='select-input'
                  />
                }
                // renderValue={(selected) => {
                //   if (!selected) {
                //     return <h1 className="select-menu-item">All</h1>;
                //   }
                //   return selected as string;
                // }}
                MenuProps={{
                  PaperProps: {
                    className: 'select-dropdown', 
        
                  },
                }}
              >
                
                  {/* <MenuItem value="">
                    <h1 className="select-menu-item">All</h1>
                  </MenuItem> */}
                
               
                    <MenuItem
                      // key={eqtype.eqType}
                      // value={eqtype.eqType}
                      className="select-menu-item"
                    >
                      {/* {eqtype.eqType} */}
                      1
                    </MenuItem>
                
                 
                  {/* <MenuItem disabled className="select-menu-item">
                    No Equipment Types Available
                  </MenuItem> */}
                
              </Select>
            </FormControl> <FormControl fullWidth variant="outlined" sx={{ mt: 2, height: 'auto' }}>
              <InputLabel className='select-label' shrink>
                Approved 
              </InputLabel>
              <Select
                displayEmpty
                // value={selectedEqType}
                className='nz-searchcombo'
                // onChange={handleEqTypeChange}
                input={
                  <OutlinedInput
                    notched
                    label={`Approved`}
                    className='select-input'
                  />
                }
                // renderValue={(selected) => {
                //   if (!selected) {
                //     return <h1 className="select-menu-item">All</h1>;
                //   }
                //   return selected as string;
                // }}
                MenuProps={{
                  PaperProps: {
                    className: 'select-dropdown', 
        
                  },
                }}
              >
                
                  {/* <MenuItem value="">
                    <h1 className="select-menu-item">All</h1>
                  </MenuItem> */}
                
               
                    <MenuItem
                      // key={eqtype.eqType}
                      // value={eqtype.eqType}
                      className="select-menu-item"
                    >
                      {/* {eqtype.eqType} */}
                      1
                    </MenuItem>
                
                 
                  {/* <MenuItem disabled className="select-menu-item">
                    No Equipment Types Available
                  </MenuItem> */}
                
              </Select>
            </FormControl> <FormControl fullWidth variant="outlined" sx={{ mt: 2, height: 'auto' }}>
              <InputLabel className='select-label' shrink>
                Management Unit 1 
              </InputLabel>
              <Select
                displayEmpty
                // value={selectedEqType}
                className='nz-searchcombo'
                // onChange={handleEqTypeChange}
                input={
                  <OutlinedInput
                    notched
                    label={`Management Unit 1`}
                    className='select-input'
                  />
                }
                // renderValue={(selected) => {
                //   if (!selected) {
                //     return <h1 className="select-menu-item">All</h1>;
                //   }
                //   return selected as string;
                // }}
                MenuProps={{
                  PaperProps: {
                    className: 'select-dropdown', 
        
                  },
                }}
              >
                
                  {/* <MenuItem value="">
                    <h1 className="select-menu-item">All</h1>
                  </MenuItem> */}
                
               
                    <MenuItem
                      // key={eqtype.eqType}
                      // value={eqtype.eqType}
                      className="select-menu-item"
                    >
                      {/* {eqtype.eqType} */}
                      1
                    </MenuItem>
                
                 
                  {/* <MenuItem disabled className="select-menu-item">
                    No Equipment Types Available
                  </MenuItem> */}
                
              </Select>
            </FormControl> <FormControl fullWidth variant="outlined" sx={{ mt: 2, height: 'auto' }}>
              <InputLabel className='select-label' shrink>
              Management Unit 2 
              </InputLabel>
              <Select
                displayEmpty
                // value={selectedEqType}
                className='nz-searchcombo'
                // onChange={handleEqTypeChange}
                input={
                  <OutlinedInput
                    notched
                    label={`Management Unit 2`}
                    className='select-input'
                  />
                }
                // renderValue={(selected) => {
                //   if (!selected) {
                //     return <h1 className="select-menu-item">All</h1>;
                //   }
                //   return selected as string;
                // }}
                MenuProps={{
                  PaperProps: {
                    className: 'select-dropdown', 
        
                  },
                }}
              >
                
                  {/* <MenuItem value="">
                    <h1 className="select-menu-item">All</h1>
                  </MenuItem> */}
                
               
                    <MenuItem
                      // key={eqtype.eqType}
                      // value={eqtype.eqType}
                      className="select-menu-item"
                    >
                      {/* {eqtype.eqType} */}
                      1
                    </MenuItem>
                
                 
                  {/* <MenuItem disabled className="select-menu-item">
                    No Equipment Types Available
                  </MenuItem> */}
                
              </Select>
            </FormControl> <FormControl fullWidth variant="outlined" sx={{ mt: 2, height: 'auto' }}>
              <InputLabel className='select-label' shrink>
                Arrange By 
              </InputLabel>
              <Select
                displayEmpty
                // value={selectedEqType}
                className='nz-searchcombo'
                // onChange={handleEqTypeChange}
                input={
                  <OutlinedInput
                    notched
                    label={`Arrange By`}
                    className='select-input'
                  />
                }
                // renderValue={(selected) => {
                //   if (!selected) {
                //     return <h1 className="select-menu-item">All</h1>;
                //   }
                //   return selected as string;
                // }}
                MenuProps={{
                  PaperProps: {
                    className: 'select-dropdown', 
        
                  },
                }}
              >
                
                  {/* <MenuItem value="">
                    <h1 className="select-menu-item">All</h1>
                  </MenuItem> */}
                
               
                    <MenuItem
                      // key={eqtype.eqType}
                      // value={eqtype.eqType}
                      className="select-menu-item"
                    >
                      {/* {eqtype.eqType} */}
                      1
                    </MenuItem>
                
                 
                  {/* <MenuItem disabled className="select-menu-item">
                    No Equipment Types Available
                  </MenuItem> */}
                
              </Select>
            </FormControl> <FormControl fullWidth variant="outlined" sx={{ mt: 2, height: 'auto' }}>
              <InputLabel className='select-label' shrink>
                Filter By 
              </InputLabel>
              <Select
                displayEmpty
                // value={selectedEqType}
                className='nz-searchcombo'
                // onChange={handleEqTypeChange}
                input={
                  <OutlinedInput
                    notched
                    label={`Filter By`}
                    className='select-input'
                  />
                }
                // renderValue={(selected) => {
                //   if (!selected) {
                //     return <h1 className="select-menu-item">All</h1>;
                //   }
                //   return selected as string;
                // }}
                MenuProps={{
                  PaperProps: {
                    className: 'select-dropdown', 
        
                  },
                }}
              >
                
                  {/* <MenuItem value="">
                    <h1 className="select-menu-item">All</h1>
                  </MenuItem> */}
                
               
                    <MenuItem
                      // key={eqtype.eqType}
                      // value={eqtype.eqType}
                      className="select-menu-item"
                    >
                      {/* {eqtype.eqType} */}
                      1
                    </MenuItem>
                
                 
                  {/* <MenuItem disabled className="select-menu-item">
                    No Equipment Types Available
                  </MenuItem> */}
                
              </Select>
            </FormControl>
      </Box>

    </div>
  )
}
