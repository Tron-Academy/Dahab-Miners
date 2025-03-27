import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import useTimeElapsed from "../../../hooks/useTimeElapsed";
import { formatTimeElapsed, getTimeElapsed } from "../../../utils/timeFunction";

export default function AdminRepairTable({ miners }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Serial No
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Mac Address
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Worker ID
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Owner
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Now Running
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Time In Repair
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {miners.map((x) => (
            <TableRow
              key={x._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.serialNumber}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.macAddress}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.workerId}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.owner}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.nowRunning}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {formatTimeElapsed(getTimeElapsed(x.createdAt))}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.status}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                <Link
                  to={`/admin/repair/status/${x.id}`}
                  className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
                >
                  Action
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
