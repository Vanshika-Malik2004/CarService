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
import { Button, Modal } from '@mui/material';
import SelectDateTime from './SelectDateTime';


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
    id: 'name',
    label: 'Service Provider Name',
    minWidth: 170,
    align: 'center',

  },
  {
    id: 'action',
    label: 'Book Appointment',
    minWidth: 170,
    align: 'cetner',
  },

];


  

export default function BookAppointment() {
  const navigate = useNavigate();
  const [rows,setRows] = React.useState([])
  const [row,setRow] = React.useState([])
  const { signOutUser, currentUser, updateCurrentUser } =
  React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  React.useEffect(() => {
      const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (!tempUser) {
        navigate("/createuser");
      } else {
        updateCurrentUser(tempUser);
        // console.log(tempUser.email);
        console.log('currentUser',tempUser);
      }
      getServices();
    },[]);

    async function getServices() {

      
      const { data , error} = await supabase.from('ServicesTable').select('* , ServiceProvider(*)');
      
      if(!data)
      console.log('data error: ',error);
      else 
      console.log('data',data);
      data.forEach((row)=>row['name']=row.ServiceProvider.name)
      setRows(data)
    }

    const book = async (row,date,time)=>
    {
      console.log(row);
      console.log(currentUser);
      const { error } = await supabase
        .from('AppointmentsTable')
        .insert([
          { ProviderId: row.ProviderID, serviceID: row.ServiceID, consumerEmail:currentUser.email,consumerContactNumber:currentUser.user_metadata.phone,
            AppointmentDate: date,AppointmentTime:time,
        Status:'Pending'},
        ])
        .select()

      if(error)console.log("error in booking appointment",error)
      handleClose();
    }
    const takeAction = async (row)=>
    {
      console.log(row);
      setRow(row)
      handleOpen();
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
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SelectDateTime book={(date,time)=>{book(row,date,time)}} />
      </Modal>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        Available Services
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
                                      <Button variant="outlined" color="success" onClick={()=>takeAction(row)}>
                                        Book
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

