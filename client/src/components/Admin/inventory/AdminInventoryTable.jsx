import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminInventoryTable({ items }) {
  const { user } = useSelector((state) => state.user);
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
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
              Item Name
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Category
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Current Quantity
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Stock Threshold
            </TableCell>
            <TableCell
              sx={{
                width: "12.5%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Location
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
              last Updated
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
          {items?.map((x) => (
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
                {x.itemName}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.category}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.quantity}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.threshold}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.location}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.quantity === 0 ? (
                  <p>Out Of Stock</p>
                ) : x.quantity >= x.threshold ? (
                  <p>In Stock</p>
                ) : (
                  <p>Low Stock</p>
                )}
                {x.restockStatus === "Approve" && (
                  <p className="text-red-500">Pending Restock</p>
                )}
                {x.restockStatus === "Ignore" && (
                  <p className="text-red-500">Restock Cancelled</p>
                )}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                {x.updatedAt.slice(0, 10)}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ width: "12.5%", textAlign: "center" }}
              >
                <Link to={`/admin/inventory/${x._id}`}>
                  <button
                    className={`px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white disabled:cursor-not-allowed disabled:bg-gray-200`}
                    disabled={user?.role === "admin"}
                  >
                    {" "}
                    Details
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
