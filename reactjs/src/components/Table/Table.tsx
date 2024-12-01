import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Data, Column } from "./_model";
import UpdateUserModal from "../Modals/UpdateUserInfoModal";
import { forkJoin } from "rxjs";
import { addEmployee$, getEmployees$, deleteEmployee$ } from "./_request";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { toastOptions } from "../Toast/Toast";
import Swal from "sweetalert2";

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

function createData(id: number, name: string, title: number): Data {
  return { id, name, title };
}

const rows = [
  createData(1, "India", 1324171354),
  createData(2, "China", 1403500365),
  createData(3, "Italy", 60483973),
  createData(4, "United States", 327167434),
  createData(5, "Canada", 37602103),
  createData(6, "Australia", 25475400),
  createData(7, "Germany", 83019200),
  createData(8, "Ireland", 4857000),
  createData(9, "Mexico", 126577691),
  createData(10, "Japan", 126317000),
  createData(11, "France", 67022000),
  createData(12, "United Kingdom", 67545757),
  createData(13, "Russia", 146793744),
  createData(14, "Nigeria", 200962417),
  createData(15, "Brazil", 210147125),
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: null,
    title: null,
  });
  const [data, setData] = useState([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    debugger;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditModalOpen = (rowData: any) => {
    setModalData({ name: rowData.name, title: rowData.title });
    setOpen(true);
  };

  const handleAddModalOpen = () => {
    setModalData({ name: null, title: null });
    setOpen(true);
  };

  const handleDelete = (rowData: any) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        title: "swal-custom-title",
        icon: "swal-custom-icon text-red-500",
        confirmButton: "bg-black rounded-md",
        cancelButton: " bg-gray-400 rounded-md hover:bg-gray-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform your delete logic here
        // Example: Call a function to delete the row data
        // deleteEmployee$(rowData.id);
        toast.success("Deleted Successfully", toastOptions);

        // Swal.fire({
        //   toast: true,
        //   position: "top-end",
        //   title: "Deleted Successfully!",
        //   icon: "success",
        //   timer: 3000,
        //   timerProgressBar: true,
        //   showConfirmButton: false,
        //   customClass: {
        //     title: "swal-custom-title",
        //     icon: "swal-custom-icon",
        //   },
        //   didOpen: (toast) => {
        //     setTimeout(() => {
        //       Swal.close(); // Close the toast after timer ends
        //     }, 3000);
        //   },
        // });
      }
    });
  };

  const handleEditModalClose = () => {
    setModalData({ name: null, title: null });
    setOpen(false);
  };

  useEffect(() => {
    // const observable = forkJoin([getEmployees$(), addEmployee$(2)]);
    // observable.subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     // setModalData(data);
    //   },
    //   error(err) {
    //     console.log("ERROR: ", err);
    //   },
    // });
  }, []);

  return (
    <>
      <UpdateUserModal
        open={open}
        onClose={handleEditModalClose}
        onSubmit={handleEditModalClose}
        data={modalData}
        setData={setModalData}
      />
      <Paper
        sx={{ width: "60%", overflow: "hidden" }}
        className="border border-gray-400 shadow-none"
      >
        <TableContainer
          sx={{ maxHeight: 440 }}
          className="overflow-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        >
          <button className="m-3 addButton" onClick={handleAddModalOpen}>
            Add Employee
          </button>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                            {column.id === "action" ? (
                              <div className="flex">
                                <button
                                  onClick={() => handleEditModalOpen(row)}
                                >
                                  <span className="material-symbols-outlined">
                                    edit
                                  </span>
                                </button>
                                <button onClick={() => handleDelete(row)}>
                                  <span className="material-symbols-outlined">
                                    delete
                                  </span>
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
