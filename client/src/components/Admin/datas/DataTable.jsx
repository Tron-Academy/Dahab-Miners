import React, { useEffect, useState } from "react";
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
import Pagination from "../../buyMiners/Pagination";

export default function DataTable({ search, farm }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { loading, data, refetch, pages } = useGetData({
    search,
    farm,
    currentPage,
  });

  const dispatch = useDispatch();
  const { refetchTrigger } = useSelector((state) => state.admin);

  useEffect(() => {
    setTotalPage(pages);
  }, [data, refetch, loading]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    refetch();
  }, [refetchTrigger]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Client
              </TableCell>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Model
              </TableCell>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Serial No
              </TableCell>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Worker ID
              </TableCell>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Mac Id
              </TableCell>

              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Act. Location
              </TableCell>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Cur. Location
              </TableCell>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Now Running
              </TableCell>
              <TableCell
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
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
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.clientName}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "11.11%",
                    textAlign: "center",
                    maxWidth: "100px",
                  }}
                >
                  {row.modelName}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "11.11%",
                    textAlign: "center",
                    textWrap: "wrap",
                  }}
                >
                  {row.serialNumber}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    width: "11.11%",
                    textAlign: "center",
                    textWrap: "wrap",
                  }}
                >
                  {row.workerId}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.macAddress}
                </TableCell>

                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.actualLocation}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.currentLocation}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ width: "11.11%", textAlign: "center" }}
                >
                  {row.temporaryOwner}
                </TableCell>
                <TableCell sx={{ width: "11.11%", textAlign: "center" }}>
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
      {totalPage > 1 && (
        <div className="my-3 flex justify-end">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            setTotalPage={setTotalPage}
          />
        </div>
      )}
    </>
  );
}
