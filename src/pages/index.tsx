import { APARATUR, DOKUMEN_N6, JABATAN, PEKERJAAN, USERS_DESA } from "@/config/endpoint";
import { Chip, Spinner } from "@nextui-org/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const useFetchAllData = () => {
  const { data: jabatanData, error: jabatanError, isLoading: jabatanLoading } = useSWR(`${JABATAN}`, { keepPreviousData: true });
  const { data: pekerjaanData, error: pekerjaanError, isLoading: pekerjaanLoading } = useSWR(`${PEKERJAAN}`, { keepPreviousData: true });
  const { data: usersDesaData, error: usersDesaError, isLoading: usersDesaLoading } = useSWR(`${USERS_DESA}`, { keepPreviousData: true });
  const { data: aparaturData, error: aparaturError, isLoading: aparaturLoading } = useSWR(`${APARATUR}`, { keepPreviousData: true });
  const { data: n6Data, error: n6Error, isLoading: n6Loading } = useSWR(`${DOKUMEN_N6}`, { keepPreviousData: true });

  const isLoading = jabatanLoading || pekerjaanLoading || usersDesaLoading || aparaturLoading || n6Loading;
  const error = jabatanError || pekerjaanError || usersDesaError || aparaturError || n6Error;
  const data = {
    jabatan: jabatanData,
    pekerjaan: pekerjaanData,
    usersDesa: usersDesaData,
    aparatur: aparaturData,
    n6: n6Data,
  };

  return { data, isLoading, error };
};

export default function Home() {
  const { data: session, status } = useSession()
  const user: any = session?.user || {}

  const { data, isLoading, error } = useFetchAllData();
  console.log(data)
  return (
    <div>
      <div className="mt-2 mb-5 ">
        <div className="text-xl font-bold tracking-tighter">
          Selamat Datang Kembali, <strong>{user?.nama_user}</strong>
          <div>
            <Chip color="primary" variant="flat"> <div className="font-semibold">{dayjs().format('dddd, MMMM YYYY')}
            </div></Chip>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-primary p-5 rounded-xl text-white">
          Pekerjaan
          <div className="text-xl font-bold">
            {isLoading ? (<Spinner color="white" size="sm" />) : data?.pekerjaan?.totalRows}

          </div>
        </div>
        <div className="bg-primary p-5 rounded-xl text-white">
          Jabatan
          <div className="text-xl font-bold">
            {isLoading ? (<Spinner color="white" size="sm" />) : data?.jabatan?.totalRows}

          </div>
        </div>
        <div className="bg-primary p-5 rounded-xl text-white">
          Aparatur
          <div className="text-xl font-bold">
            {isLoading ? (<Spinner color="white" size="sm" />) : data?.aparatur?.totalRows}

          </div>
        </div>
        <div className="bg-primary p-5 rounded-xl text-white">
          User
          <div className="text-xl font-bold">
            {isLoading ? (<Spinner color="white" size="sm" />) : data?.usersDesa?.totalRows}

          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div className="bg-primary p-5 rounded-xl text-white">
          Dokument Nikah
          <div className="text-xl font-bold">
            200
          </div>
        </div>
        <div className="bg-primary p-5 rounded-xl text-white">
          Dokument Kematian
          <div className="text-xl font-bold">
            {isLoading ? (<Spinner color="white" size="sm" />) : data?.n6?.totalRows}
          </div>
        </div>
      </div>
    </div>
  )
}
