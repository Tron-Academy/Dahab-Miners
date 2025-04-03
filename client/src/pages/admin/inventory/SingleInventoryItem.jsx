import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetSingleItem from "../../../hooks/adminInventory/useGetSingleItem";
import Loading from "../../../components/Loading";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";
import useUpdateInventory from "../../../hooks/adminInventory/useUpdateInventory";
import { useSelector } from "react-redux";

export default function SingleInventoryItem() {
  const { id } = useParams();
  const { loading, item } = useGetSingleItem({ id });
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Repair Components");
  const [quantity, setQuantity] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [location, setLocation] = useState("");
  const { loading: updateLoading, updateItem } = useUpdateInventory();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (item) {
      setName(item.itemName);
      setCategory(item.category);
      setQuantity(item.quantity);
      setThreshold(item.threshold);
      setLocation(item.location);
    }
  }, [item, loading]);
  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="my-5 flex justify-end">
        <Link
          to={"/admin/inventory"}
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
        >
          Go Back
        </Link>
      </div>
      <h2 className="md:text-2xl text-lg my-2">{item?.itemName}</h2>
      <div className="my-10">
        <FormInput
          title={"Item Name"}
          type={"text"}
          placeholder={"Enter Name"}
          admin
          value={name}
          disabled={user?.role === "admin"}
          onchange={(e) => setName(e.target.value)}
        />
        <FormSelect
          title={"Category"}
          issue
          list={["Repair Components", "Mining Facility Items"]}
          value={category}
          disabled={user?.role === "admin"}
          onchange={(e) => setCategory(e.target.value)}
        />
        <FormInput
          title={"Quantity"}
          type={"number"}
          placeholder={"Enter Quantity"}
          admin
          disabled={user?.role === "admin"}
          value={quantity}
          onchange={(e) => setQuantity(e.target.value)}
        />
        <FormInput
          title={"Threshold"}
          type={"number"}
          placeholder={"Enter minimum quantity"}
          disabled={user?.role === "admin"}
          admin
          value={threshold}
          onchange={(e) => setThreshold(e.target.value)}
        />
        <FormInput
          title={"Location"}
          type={"text"}
          placeholder={"Enter location"}
          disabled={user?.role === "admin"}
          admin
          value={location}
          onchange={(e) => setLocation(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white disabled:cursor-not-allowed disabled:bg-gray-200"
            disabled={user?.role === "admin"}
            onClick={() =>
              updateItem({ id, name, category, quantity, threshold, location })
            }
          >
            Update
          </button>
        </div>
        {updateLoading && <Loading />}
      </div>
    </div>
  );
}
