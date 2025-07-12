import { ContainerCard } from "@/components/ui/ContainerCard";
import Table from "@/components/ui/Table";
import { Data } from "@/constants/management/data";
import { attendanceColumns } from "@/constants/management/column";

export default function AttendancePage() {
  const filteredData = Data.filter((item) => item.checkInTime && item.method);

  return (
    <ContainerCard>
      <Table data={filteredData} columns={attendanceColumns} />
    </ContainerCard>
  );
}
