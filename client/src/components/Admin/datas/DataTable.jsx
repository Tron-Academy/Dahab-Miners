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
              sx={{ width: "16.6%", textAlign: "center", fontWeight: "bold" }}
            >
              Client Name
            </TableCell>
            <TableCell
              sx={{ width: "16.6%", textAlign: "center", fontWeight: "bold" }}
            >
              Model Number
            </TableCell>
            <TableCell
              sx={{ width: "16.6%", textAlign: "center", fontWeight: "bold" }}
            >
              Serial Number
            </TableCell>
            <TableCell
              sx={{ width: "16.6%", textAlign: "center", fontWeight: "bold" }}
            >
              Mac Address
            </TableCell>
            <TableCell
              sx={{ width: "16.6%", textAlign: "center", fontWeight: "bold" }}
            >
              Location
            </TableCell>
            <TableCell
              sx={{ width: "16.6%", textAlign: "center", fontWeight: "bold" }}
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
                sx={{ width: "16.6%", textAlign: "center" }}
              >
                {row.clientName}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "16.6%", textAlign: "center" }}
              >
                {row.modelNumber}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "16.6%", textAlign: "center" }}
              >
                {row.serialNumber}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "16.6%", textAlign: "center" }}
              >
                {row.macAddress}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "16.6%", textAlign: "center" }}
              >
                {row.location}
              </TableCell>
              <TableCell sx={{ width: "16.6%", textAlign: "center" }}>
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
