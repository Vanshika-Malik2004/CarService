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
import { Button , Modal} from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CreateNewService from '../Components/CreateNewService';
import { toast } from 'react-toastify';


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
  const [pid,setPid] = React.useState(null)
  
  // return <div>the is my service component</div>
  const { signOutUser, currentUser, updateCurrentUser } =
    React.useContext(AuthContext);

    React.useEffect(() => {
      const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (!tempUser) {
          toast.error('First Login !', {
          toastId:'FirstLogin',
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        navigate("/login/user");
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
      
      if(id.error)
      {
      console.log('id error: ',id.error);
      
        toast.error('Some thing went wrong !\n'+id.error, {
          toastId:'MyServiceIdError',
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }); 
        // console.log('id data',id.data);
      }
      setPid(id.data[0].id);
      
      const { data , error} = await supabase.from('ServicesTable').select().eq('ProviderID',id.data[0].id);
      
      if(!data)
      {
        console.log('data error: ',error);
        toast.error('Some thing went wrong !\n'+error, {
          toastId:'MyServiceDataError',
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          }); 
          // console.log('data',data);
      } 

      setRows(data)
    }

    const takeAction = async (id)=>
    {
      // console.log(id);
      const { error } = await supabase
      .from('ServicesTable')
      .delete()
      .eq('ServiceID',id)
      if(error)
      {
        console.log("update error",error)
        toast.error('Error '+error, {
          toastId:'MyServicesUpdateError',
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      else
      {
        toast.success('Service removed successfully !', {
          toastId:'MyServicesUpdateSuccess',
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          }); 
          console.log("delete error",error)
          getServices();
      }
      
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
  const [open,setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div className="max-w-5xl flex flex-col gap-10 w-full h-fit bg-gray-800 text-white my-6 rounded-lg p-10">
      <h1 className="p-4 text-3xl font-bold">Listed Services</h1>

    <Modal
        open={open}
        onClose={()=>handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateNewService handleClose={()=>{handleClose();}} pid={pid} success={()=>{getServices();}}/>
      </Modal>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    
   {pid && <Fab color="primary" style={{ position:'fixed', bottom: 50, right:50}} onClick={handleOpen}>
      <AddIcon />
    </Fab>}
      <TableContainer sx={{ maxHeight: 440 }}>
        
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight:"bold",
                  }}
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
                                      <Button variant="contained" color="error" onClick={()=>takeAction(row['ServiceID'])}>
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
    </div>
  );
}

