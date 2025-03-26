import React, { useState } from "react";
import SectionHeadings from "../../../components/Admin/repair/repairSections/SectionHeadings";
import Section1Content from "../../../components/Admin/repair/repairSections/Section1Content";
import { Link } from "react-router-dom";

export default function RepairSectionsPage() {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
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
        {active1 && <Section1Content />}
        <SectionHeadings
          name={"Section 2"}
          active={active2}
          setActive={setActive2}
        />
        {active2 && <Section1Content />}
        <SectionHeadings
          name={"Section 3"}
          active={active3}
          setActive={setActive3}
        />
        {active3 && <Section1Content />}
      </div>
    </div>
  );
}
