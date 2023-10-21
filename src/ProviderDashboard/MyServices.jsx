// import React from "react";

// const MyServices = () => {
//   return <div>MyServices</div>;
// };

// export default MyServices;
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { supabase } from '../SupabaseConfig';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { Button } from '@mui/material';


const columns = [
  { id: 'SI', label: 'SI', minWidth: 70 },
  {
    id: 'Service Name',
    label: 'Service Name',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'ServiceID', label: 'Service ID', minWidth: 70 ,align:'center'},
  {
    id: 'Description',
    label: 'Description',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Price',
    label: 'Price',
    minWidth: 170,
    align: 'center',

  },
  {
    id: 'action',
    label: 'Remove Service',
    minWidth: 170,
    align: 'cetner',
  },

];


export default function MyServices() {
  const navigate = useNavigate();
  const [rows,setRows] = React.useState([])
  
  // return <div>the is my service component</div>
  const { signOutUser, currentUser, updateCurrentUser } =
    React.useContext(AuthContext);

    React.useEffect(() => {
      const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (!tempUser) {
        navigate("/createuser");
      } else {
        updateCurrentUser(tempUser);
        // console.log(tempUser.email);
        // console.log(currentUser);
      }
      getServices();
    },[]);

    async function getServices() {

      // console.log('email',currentUser.email);
      const id = await supabase.from('ServiceProvider').select('*').eq('email',currentUser.email);  
      
      if(!id.data)
      console.log('id error: ',id.error);
      // else 
      // console.log('id data',id.data);
      
      const { data , error} = await supabase.from('ServicesTable').select().eq('ProviderID',id.data[0].id);
      
      if(!data)
      console.log('data error: ',error);
      // else 
      // console.log('data',data);

      setRows(data)
    }

    const takeAction = async (id)=>
    {
      // console.log(id);
      const { error } = await supabase
      .from('ServicesTable')
      .delete()
      .eq('ServiceID',id)
      if(error)console.log("delete error",error)
      else getServices()
    }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        Listed Services
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key='index' align='left'>
                      {index+1}
                    </TableCell>
                    {columns.slice(1).map((column) => {
                      const value = row[column.id];
                      return (
                        
                        <TableCell key={column.id} align={column.align}>
                          {
                            (column.id === 'action')?
                            (<div className='flex flex-col gap-2'>
                                      <Button variant="outlined" color="error" onClick={()=>takeAction(row['ServiceID'])}>
                                        Remove
                                      </Button>
                                {/* <button className="flex mb-1 dang" onClick={()=>takeAction(row['id'],'Completed')}>
                                  Completed
                                </button>
                                <button className="flex mt-1" onClick={()=>takeAction(row['id'],'Cancel')}>
                                  Cancel
                                </button> */}
                            </div>
                            )
                            :
                            column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  
                  </TableRow>
                );
              })
              
              }
          </TableBody>
        </Table>
            {(!rows) && 
              <div className='flex  justify-evenly'>
               No Data To Show
              </div>
            }
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={(rows)?rows.length:0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}

