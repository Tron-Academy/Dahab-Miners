import React, { useEffect, useState } from "react";
import SectionHeadings from "../../../components/Admin/repair/repairSections/SectionHeadings";
import Section1Content from "../../../components/Admin/repair/repairSections/Section1Content";
import { Link, useParams } from "react-router-dom";
import useGetSingleMiner from "../../../hooks/adminRepair/useGetSingleMiner";
import Section2Content from "../../../components/Admin/repair/repairSections/Section2Content";
import { useSelector } from "react-redux";
import Section3Content from "../../../components/Admin/repair/repairSections/Section3Content";
import HistoryElement from "../../../components/Admin/repair/repairSections/HistoryElement";

export default function RepairSectionsPage() {
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(true);
  const [active3, setActive3] = useState(true);
  const { id } = useParams();
  const { loading, miner, refetch } = useGetSingleMiner({ id });
  const { refetchTrigger } = useSelector((state) => state.admin);

  useEffect(() => {
    refetch();
  }, [refetchTrigger]);
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
        {miner?.failHistory && (
          <h2 className="text-2xl font-semibold">History</h2>
        )}
        {miner?.failHistory &&
          miner?.report.map((x) => <HistoryElement key={x._id} report={x} />)}

        <SectionHeadings
          name={"Section 1"}
          active={active1}
          setActive={setActive1}
        />
        <Section1Content miner={miner} loading={loading} />
        <SectionHeadings
          name={"Section 2"}
          active={active2}
          setActive={setActive2}
        />
        {(miner?.status === "Need Repair" ||
          miner?.status === "Need Testing" ||
          miner?.status === "Ready To Connect") && (
          <Section2Content miner={miner} />
        )}
        <SectionHeadings
          name={"Section 3"}
          active={active3}
          setActive={setActive3}
        />
        {(miner?.status === "Need Testing" ||
          miner?.status === "Ready To Connect") && (
          <Section3Content miner={miner} />
        )}
      </div>
    </div>
  );
}
