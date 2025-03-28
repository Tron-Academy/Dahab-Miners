import React, { useState } from "react";
import SectionHeadings from "../../../components/Admin/repair/repairSections/SectionHeadings";
import Section1Content from "../../../components/Admin/repair/repairSections/Section1Content";
import { Link, useParams } from "react-router-dom";
import useGetSingleMiner from "../../../hooks/adminRepair/useGetSingleMiner";

export default function RepairSectionsPage() {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const { id } = useParams();
  const { loading, miner } = useGetSingleMiner({ id });
  return (
    <div>
      <div className="my-5 flex justify-end">
        <Link
          to={"/admin/repair"}
          className="px-4 py-2 rounded-md bg-homeBg hover:bg-homeBgGradient text-white"
        >
          Go Back
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <SectionHeadings
          name={"Section 1"}
          active={active1}
          setActive={setActive1}
        />
        {active1 && <Section1Content miner={miner} loading={loading} />}
        <SectionHeadings
          name={"Section 2"}
          active={active2}
          setActive={setActive2}
        />

        <SectionHeadings
          name={"Section 3"}
          active={active3}
          setActive={setActive3}
        />
      </div>
    </div>
  );
}
