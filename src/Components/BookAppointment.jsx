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
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Button, Modal } from "@mui/material";
import SelectDateTime from "./SelectDateTime";
import { toast } from "react-toastify";
import image1 from "../assets/carService1.jpg";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Font Awesome location icon
import { FaPhone, FaEnvelope } from "react-icons/fa";
const columns = [
  { id: "SI", label: "SI", minWidth: 50 },
  {
    id: "Service Name",
    label: "Service Name",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "ServiceID", label: "Service ID", minWidth: 50, align: "center" },
  {
    id: "Description",
    label: "Description",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Price",
    label: "Price",
    minWidth: 150,
    align: "center",
  },
  {
    id: "action",
    label: "Book Appointment",
    minWidth: 150,
    align: "cetner",
  },
];

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [row, setRow] = React.useState([]);
  const [providerDetails, setProviderDetails] = useState(null);
  const { signOutUser, currentUser, updateCurrentUser } =
    React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      // console.log("currentUser", tempUser);
    }
    fetchDetails(id);
    getServices(id);
  }, []);
  const fetchDetails = async (id) => {
    const { data, error } = await supabase
      .from("ServiceProvider")
      .select()
      .eq("id", id);
    if (error) {
      console.log("data error: ", error);
      toast.error("Error !\n" + error, {
        toastId: "ServicesTableError",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // console.log("data", data);
    }
    if (data) {
      setProviderDetails(data[0]);
      // console.log(data[0]);
      // console.log("data received");
    }
  };
  async function getServices(id) {
    const { data, error } = await supabase
      .from("ServicesTable")
      .select()
      .eq("ProviderID", id);

    if (error) {
      console.log("data error: ", error);
      toast.error("Error !\n" + error, {
        toastId: "ServicesTableError",
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
    // console.log(data);
    setRows(data);
  }

  const book = async (row, date, time) => {
    // console.log(row);
    // console.log(currentUser);
    const { error } = await supabase
      .from("AppointmentsTable")
      .insert([
        {
          ProviderId: row.ProviderID,
          serviceID: row.ServiceID,
          consumerEmail: currentUser.email,
          consumerContactNumber: currentUser.user_metadata.phone,
          AppointmentDate: date,
          AppointmentTime: time,
          Status: "Pending",
        },
      ])
      .select();

    if (error) {
      toast.error("Error !\n" + error, {
        toastId: "AppointmentBookError",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("error in booking appointment", error);
    } else {
      toast.success("Appointment Booked Successfully !", {
        toastId: "AppointBooked",
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
    handleClose();
  };
  const takeAction = async (row) => {
    // console.log(row);

    setRow(row);
    handleOpen();
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="flex flex-col bg-white max-w-4xl  h-fit m-10 rounded-lg">
      <div className="w-full h-1/3">
        <img
          src={image1}
          className="rounded-t-lg w-full max-h-96 object-cover"
        />
      </div>
      <div className="px-6 pb-20 flex flex-col justify-start gap-10 mt-10">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-5xl">
              {providerDetails != null ? providerDetails.name : ""}
            </h1>
            <div className="flex gap-2">
              <FaMapMarkerAlt size={25} color="#DC143C" />
              <h3 className="text-slate-600">
                {" "}
                {providerDetails != null ? providerDetails.address : ""}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2">
              <FaPhone size={20} color="grey" />
              <h3 className="text-slate-600">
                {providerDetails != null ? providerDetails.ContactNumber : ""}
              </h3>
            </div>
            <div className="flex gap-2">
              <FaEnvelope size={20} color="grey" />
              <h3 className="text-slate-600">
                {providerDetails != null ? providerDetails.email : ""}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-3xl">Available Services</h2>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="backdrop-filter backdrop-blur-lg bg-opacity-30 bg-white z-10"
          >
            <SelectDateTime
              providerId={id}
              book={(date, time) => {
                book(row, date, time);
              }}
            />
          </Modal>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        {
                          /* console.log(row); */
                        }
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            <TableCell key="index" align="left">
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            {columns.slice(1).map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id === "action" ? (
                                    <div className="flex flex-col gap-2">
                                      <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => takeAction(row)}
                                      >
                                        Book
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
      </div>
    </div>
  );
}
