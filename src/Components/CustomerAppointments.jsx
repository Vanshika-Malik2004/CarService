import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { supabase } from "../SupabaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const columns = [
  { id: "id", label: "ID", minWidth: 30 },
  { id: "serviceID", label: "Service ID", minWidth: 30, fontWeight: "bold" },
  {
    id: "consumerEmail",
    label: "Consumer Email",
    minWidth: 130,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "consumerContactNumber",
    label: "Consumer Contact Number",
    minWidth: 130,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AppointmentDate",
    label: "Appointment Date",
    minWidth: 130,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "AppointmentTime",
    label: "Appointment Time",
    minWidth: 130,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 130,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Take Action",
    minWidth: 130,
    align: "center",
  },
];

export default function CustomerAppointments() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [rowsPending, setRowsPending] = React.useState([]);
  const { signOutUser, currentUser, updateCurrentUser } =
    React.useContext(AuthContext);

  React.useEffect(() => {
    const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!tempUser) {
      toast.error("First Login !", {
        toastId: "FirstLogin",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/createuser");
    } else {
      updateCurrentUser(tempUser);

      // console.log(tempUser.email);
      console.log(currentUser);
    }
    getAppointments(tempUser.email);
  }, []);

  async function getAppointments(email) {
    //   console.log('email',currentUser.email);
    //   const id = await supabase.from('ServiceProvider').select('*').eq('email',currentUser.email);

    //   if(!id.data)
    //   console.log('id error: ',id.error);
    // else
    // console.log('id data',id.data);

    const { data, error } = await supabase
      .from("AppointmentsTable")
      .select()
      .eq("consumerEmail", email)
      .eq("Status", "Pending");

    if (!data) {
      {
        toast.error("Error !\n" + error, {
          toastId: "CustomerAppointmentError",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log("data", data);
      }
    }
    setRowsPending(data.length ? data : null);
    // console.log('rows',data)
    const rowsData = await supabase
      .from("AppointmentsTable")
      .select()
      .eq("consumerEmail", email)
      .neq("Status", "Pending");
    if (rowsData.error) {
      toast.error("Error !\n" + rowsData.error, {
        toastId: "CustomerAppointmentRowDataError",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("data", data);
    }
    setRows(rowsData.data);
    // console.log(providerId)
  }

  const takeAction = async (id, action) => {
    console.log(id);
    const { error } = await supabase
      .from("AppointmentsTable")
      .update({ Status: action })
      .eq("id", id)
      .select();
    if (error) {
      toast.error("Error " + error, {
        toastId: "CustomerAppointmentDataError",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("update error", error);
    } else {
      toast.success(action + " successfully !", {
        toastId: "CustomerAction",
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

    getAppointments(currentUser.email);
  };
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
    currentUser && (
      <div className="max-w-6xl flex flex-col gap-10 w-full h-fit bg-slate-900 text-white my-6 rounded-lg p-10">
        <h1 className="p-4 text-3xl font-bold">Booked Components</h1>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <TableContainer
            sx={{
              maxHeight: 440,
              overflow: "hidden",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsPending &&
                  rowsPending
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "action" ? (
                                  <div className="flex flex-col gap-2">
                                    {/* <Button variant="contained" color="success" onClick={()=>takeAction(row['id'],'Completed')}>
                                        Completed
                                      </Button> */}
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() =>
                                        takeAction(row["id"], "Canceled")
                                      }
                                    >
                                      Cancel
                                    </Button>
                                    {/* <button className="flex mb-1 dang" onClick={()=>takeAction(row['id'],'Completed')}>
                                  Completed
                                </button>
                                <button className="flex mt-1" onClick={()=>takeAction(row['id'],'Cancel')}>
                                  Cancel
                                </button> */}
                                  </div>
                                ) : column.format &&
                                  typeof value === "number" ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
            {!rowsPending && (
              <div className="flex  justify-evenly">No Data To Show</div>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rowsPending ? rowsPending.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <h1 className="p-4 text-2xl font-bold">
          {" "}
          Completed and Canceled Appointments
        </h1>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440, overflow: "hidden" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{}}>
                  {columns.slice(0, -1).map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.slice(0, -1).map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                          <TableCell key=""></TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
            {!rows && (
              <div className="flex  justify-evenly">No Data To Show</div>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows ? rows.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    )
  );
}
