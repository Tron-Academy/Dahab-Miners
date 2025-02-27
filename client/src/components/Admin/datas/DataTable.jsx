import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import useGetData from "../../../hooks/adminDatas/useGetData";
import Loading from "../../Loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataId, setShowPopupTrue } from "../../../slices/adminSlice";

export default function DataTable({ client, model, serial }) {
  const { loading, data, refetch } = useGetData({ client, model, serial });
  const dispatch = useDispatch();
  const { refetchTrigger } = useSelector((state) => state.admin);

  useEffect(() => {
    refetch();
  }, [refetchTrigger]);
  return loading ? (
    <Loading />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Brand
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Client
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Model
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Serial No
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Mac Id
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Work Id
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Act. Location
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Cur. Location
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Now Running
            </TableCell>
            <TableCell
              sx={{ width: "10%", textAlign: "center", fontWeight: "bold" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.brand}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.clientName}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.modelName}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.serialNumber}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.macAddress}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.workerId}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.actualLocation}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.currentLocation}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "14.2%", textAlign: "center" }}
              >
                {row.temporaryOwner}
              </TableCell>
              <TableCell sx={{ width: "14.2%", textAlign: "center" }}>
                <div className="flex gap-5 justify-center text-xl text-[#ABABAB]">
                  <Link to={`/admin/data/${row._id}/edit`}>
                    <FaRegEdit />
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(setShowPopupTrue());
                      dispatch(setDataId(row._id));
                    }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
