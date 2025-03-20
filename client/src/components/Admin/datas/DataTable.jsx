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
import { TiArrowUnsorted } from "react-icons/ti";
import useGetData from "../../../hooks/adminDatas/useGetData";
import Loading from "../../Loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataId,
  setLimit,
  setShowPopupTrue,
  setSortData,
} from "../../../slices/adminSlice";
import Pagination from "../../buyMiners/Pagination";

export default function DataTable() {
  const { refetchTrigger, search, farm, currentPage, limit, sortData } =
    useSelector((state) => state.admin);

  const [totalPage, setTotalPage] = useState(1);
  const { loading, data, refetch, pages, count } = useGetData({
    search,
    farm,
    currentPage,
    limit,
    sortData,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPage(pages);
  }, [data, refetch, loading]);

  useEffect(() => {
    refetch();
  }, [currentPage, limit, sortData]);

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
                onClick={() =>
                  sortData === "clientAZ"
                    ? dispatch(setSortData("clientZA"))
                    : dispatch(setSortData("clientAZ"))
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("client") && "#F0F0F0",
                }}
              >
                Client
                <span
                  className={`flex justify-center ${
                    sortData.includes("client") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "modelAZ"
                    ? dispatch(setSortData("modelZA"))
                    : dispatch(setSortData("modelAZ"))
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("model") && "#F0F0F0",
                }}
              >
                Model
                <span
                  className={`flex justify-center ${
                    sortData.includes("model") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "serialAZ"
                    ? dispatch(setSortData("serialZA"))
                    : dispatch(setSortData("serialAZ"))
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("serial") && "#F0F0F0",
                }}
              >
                Serial No
                <span
                  className={`flex justify-center ${
                    sortData.includes("serial") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "workerAZ"
                    ? dispatch(setSortData("workerZA"))
                    : dispatch(setSortData("workerAZ"))
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("worker") && "#F0F0F0",
                }}
              >
                Worker ID
                <span
                  className={`flex justify-center ${
                    sortData.includes("worker") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "macAZ"
                    ? dispatch(setSortData("macZA"))
                    : dispatch(setSortData("macAZ"))
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("mac") && "#F0F0F0",
                }}
              >
                Mac Id
                <span
                  className={`flex justify-center ${
                    sortData.includes("mac") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>

              <TableCell
                onClick={() =>
                  sortData === "actLocAZ"
                    ? dispatch(setSortData("actLocZA"))
                    : dispatch(setSortData("actLocAZ"))
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("actLoc") && "#F0F0F0",
                }}
              >
                Act. Location
                <span
                  className={`flex justify-center ${
                    sortData.includes("actLoc") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "currLocAZ"
                    ? dispatch(setSortData("currLocZA"))
                    : dispatch(setSortData("currLocAZ"))
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("currLoc") && "#F0F0F0",
                }}
              >
                Cur. Location
                <span
                  className={`flex justify-center ${
                    sortData.includes("currLoc") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
              </TableCell>
              <TableCell
                onClick={() =>
                  sortData === "nowRunAZ"
                    ? dispatch(setSortData("nowRunZA"))
                    : dispatch(setSortData("nowRunAZ"))
                }
                sx={{
                  width: "11.11%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: sortData.includes("nowRun") && "#F0F0F0",
                }}
              >
                Now Running
                <span
                  className={`flex justify-center ${
                    sortData.includes("nowRun") && "text-lg"
                  } `}
                >
                  <TiArrowUnsorted />
                </span>
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
      <p className="my-5 font-semibold text-lg">{`Total ${count} items found`}</p>
      <div className=" bg-white w-fit rounded-md">
        <select
          className="rounded-md p-2"
          value={limit}
          onChange={(e) => dispatch(setLimit(e.target.value))}
        >
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={60}>60</option>
          <option value={80}>80</option>
        </select>
      </div>
      {totalPage > 1 && (
        <div className="my-3 flex justify-end">
          <Pagination totalPage={totalPage} setTotalPage={setTotalPage} />
        </div>
      )}
    </>
  );
}
