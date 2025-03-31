import React from "react";

export default function HistoryElement({ report }) {
  return (
    <div className="p-5 bg-white rounded-md my-2">
      <div className="my-5 flex flex-col gap-5 p-5 bg-gray-100">
        {report.problemList.map((x) => (
          <div
            className="bg-gray-200 p-5 flex flex-col gap-2 rounded-md text-lg font-semibold"
            key={x._id}
          >
            <h4>{x.problem}</h4>
            <p>{x.component.split("|")[0]}</p>
            <p>{`${x.issueStatus} on ${x.updatedAt.slice(0, 10)}`}</p>
          </div>
        ))}
        <p className="font-semibold">{`Test Status: Failed`}</p>
        <img
          className="max-w-64 object-cover min-w-48"
          src={report.failureImage}
        />
        <p className="font-semibold">{`Remarks: ${report.remarks}`}</p>
      </div>
    </div>
  );
}
