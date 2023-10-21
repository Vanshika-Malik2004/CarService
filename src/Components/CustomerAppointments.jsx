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
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'serviceID', label: 'Service ID', minWidth: 70 },
  {
    id: 'consumerEmail',
    label: 'Consumer Email',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'consumerContactNumber',
    label: 'Consumer Contact Number',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'AppointmentDate',
    label: 'Appointment Date',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'AppointmentTime',
    label: 'Appointment Time',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Status',
    label: 'Status',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'action',
    label: 'Take Action',
    minWidth: 170,
    align: 'cetner',
  },

];


export default function CustomerAppointments() {
  const navigate = useNavigate();
  const [rows,setRows] = React.useState([])
  const [rowsPending,setRowsPending] = React.useState([])
  
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
      getAppointments(tempUser.email);

    },[]);

    async function getAppointments(email) {

    //   console.log('email',currentUser.email);
    //   const id = await supabase.from('ServiceProvider').select('*').eq('email',currentUser.email);  
      
    //   if(!id.data)
    //   console.log('id error: ',id.error);
      // else 
      // console.log('id data',id.data);
      
      const { data , error} = await supabase.from('AppointmentsTable').select().eq('consumerEmail',email).eq('Status','Pending');
      
      if(!data)
      console.log('data error: ',error);
      else 
      console.log('data',data);
    
    setRowsPending((data.length)?data:null)
    // console.log('rows',data)
    const rowsData = await supabase.from('AppointmentsTable').select().eq('consumerEmail',email).neq('Status','Pending');
    setRows(rowsData.data)
    // console.log(providerId)
    }

    const takeAction = async (id,action)=>
    {
      console.log(id);
      const { error } = await supabase
      .from('AppointmentsTable')
      .update({ Status: action })
      .eq('id',id)
      .select()
      if(error)console.log("update error",error)
      else getAppointments(currentUser.email)
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
    currentUser && 
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        Booked Appointments
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
            {rowsPending && rowsPending
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        
                        <TableCell key={column.id} align={column.align}>
                          {
                            (column.id === 'action')?
                            (<div className='flex flex-col gap-2'>
                                      {/* <Button variant="contained" color="success" onClick={()=>takeAction(row['id'],'Completed')}>
                                        Completed
                                      </Button> */}
                                      <Button variant="outlined" color="error" onClick={()=>takeAction(row['id'],'Canceled')}>
                                        Cancel
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
            {(!rowsPending) && 
              <div className='flex  justify-evenly'>
               No Data To Show
              </div>
            }
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={(rowsPending)?rowsPending.length:0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>


    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
      Completed and Canceled Appointments
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {(columns.slice(0,-1)).map((column) => (
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.slice(0,-1).map((column) => {
                      const value = row[column.id];
                      return (
                        
                        <TableCell key={column.id} align={column.align}>
                          {
                            column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell key=''></TableCell>
                  </TableRow>
                );
              })
              
              }
          </TableBody>
        </Table>
            {!rows && 
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

