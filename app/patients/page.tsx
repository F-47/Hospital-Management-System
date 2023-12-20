import { columns } from "@/components/patients/columns";
import PatientsHeader from "@/components/patients/header";
import { DataTable } from "@/components/ui/data-table";
import { getDoctors } from "@/services/doctors";
import { getNurses } from "@/services/nurses";
import { getPatients } from "@/services/patients";
import { getRooms } from "@/services/rooms";

type Props = {};

const GetPatients = async () => {
  const res = await getPatients();
  return res;
};

const GetRooms = async () => {
  const res = await getRooms();
  return res;
};

const GetDoctors = async () => {
  const res = await getDoctors();
  return res;
};

const GetNurses = async () => {
  const res = await getNurses();
  return res;
};

async function Patients({}: Props) {
  const patients = await GetPatients();

  return (
    <div>
      <PatientsHeader />
      {patients && <DataTable data={patients} columns={columns} />}
    </div>
  );
}

export default Patients;
