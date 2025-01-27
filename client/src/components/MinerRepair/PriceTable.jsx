import React from "react";
import {
  antminerHashboardRepairData,
  antminerPsRepairData,
  antminerPSUReplacementData,
  antminerThermalPasteData,
  antminerTroubleshootingData,
  iceriverHashboardRepairData,
  iceriverPSUReplacementData,
  iceriverThermalPAsteData,
  iceriverTroubleSHootingData,
  whatsminerHashboardRepairData,
} from "../../utils/repairdata";
import TableItem from "./TableItem";

export default function PriceTable() {
  return (
    <div className="max-w-[794px] mx-auto my-10 z-[1]">
      <div className="bg-[#26DDFF] p-3 text-[#086153] text-2xl font-semibold">
        THERMAL PASTE
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-medium text-[#26DDFF]">
        <div>{""}</div>
        <div className="ms-20">Price</div>
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>{"ANTMINER & WHATSMINER"}</div>
        <div>{""}</div>
      </div>
      {antminerThermalPasteData.map((x) => (
        <TableItem key={x.id} item={x.item} price={x.price} />
      ))}
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>{"ICERIVER"}</div>
        <div>{""}</div>
      </div>
      {iceriverThermalPAsteData.map((x) => (
        <TableItem key={x.id} item={x.item} price={x.price} />
      ))}
      <div className="bg-[#26DDFF] p-3 text-[#086153] text-2xl font-semibold">
        TROUBLESHOOTING
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-medium text-[#26DDFF]">
        <div>{""}</div>
        <div className="ms-20">Price</div>
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>{"ANTMINER & WHATSMINER"}</div>
        <div>{""}</div>
      </div>
      {antminerTroubleshootingData.map((x) => (
        <TableItem key={x.id} item={x.item} price={x.price} />
      ))}
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>{"ICERIVER"}</div>
        <div>{""}</div>
      </div>
      {iceriverTroubleSHootingData.map((x) => (
        <TableItem key={x.id} item={x.item} price={x.price} />
      ))}
      <div className="bg-[#26DDFF] p-3 text-[#086153] text-2xl font-semibold">
        POWER SUPPLY REPAIRING
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-medium text-[#26DDFF]">
        <div>{""}</div>
        <div className="ms-20">Price</div>
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>{"ANTMINER & WHATSMINER"}</div>
        <div>{""}</div>
      </div>
      {antminerPsRepairData.map((x) => (
        <TableItem key={x.id} item={x.item} price={x.price} />
      ))}
      <div className="bg-[#26DDFF] p-3 text-[#086153] text-2xl font-semibold">
        HASHBOARD REPAIR (FLAT PRICE)
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-medium text-[#26DDFF]">
        <div>{""}</div>
        <div className="ms-20">Price</div>
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>
          {"ANTMINER (Replacement above 3 chips will be charged extra)"}
        </div>
        <div>{""}</div>
      </div>
      {antminerHashboardRepairData.map((x) => (
        <TableItem key={x.id} item={x.item} price={x.price} />
      ))}
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>
          {"WHATSMINER (Replacement above 3 chips will be charged extra)"}
        </div>
        <div>{""}</div>
      </div>
      {whatsminerHashboardRepairData.map((x) => (
        <TableItem key={x.id} item={x.item} price={x.price} />
      ))}
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>{"ICERIVER"}</div>
        <div>{""}</div>
      </div>
      {iceriverHashboardRepairData.map((x) => (
        <TableItem key={x.id} price={x.price} item={x.item} />
      ))}
      <div className="bg-[#26DDFF] p-3 text-[#086153] text-2xl font-semibold">
        PSU REPLACEMENT (PSU Hardware cost will be additional)
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-medium text-[#26DDFF]">
        <div>{""}</div>
        <div className="ms-20">Price</div>
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>{"ANTMINER & WHATSMINER"}</div>
        <div>{""}</div>
      </div>
      {antminerPSUReplacementData.map((x) => (
        <TableItem key={x.id} item={x.item} price={x.price} />
      ))}
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-bold">
        <div>{"ICERIVER"}</div>
        <div>{""}</div>
      </div>
      {iceriverPSUReplacementData.map((x) => (
        <TableItem key={x.id} price={x.price} item={x.item} />
      ))}
      <div className="bg-[#26DDFF] p-3 text-[#086153] text-2xl font-semibold">
        FAN CHANGING
      </div>
      <div className="p-3 flex justify-between border border-[#B7ECE4] text-base font-medium text-[#26DDFF]">
        <div>{""}</div>
        <div className="ms-20">Price</div>
      </div>
      <TableItem item={<strong>ALL MINERS</strong>} price={"150 AED"} />
    </div>
  );
}
