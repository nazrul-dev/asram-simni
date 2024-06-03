
import dayjs from 'dayjs'
import { Pencil, PlusCircle, Trash } from 'lucide-react';
import React, { useState } from "react";
import {
  Button,
} from "@nextui-org/react";
import DataTable from '@/components/Datatable';
import useSWR from 'swr';

import DialogDelete from '@/components/DialogDelete';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { useStore } from '@/store/FormNikahKematianStore';
import Link from 'next/link';
import { DOKUMEN_N6 } from '@/config/endpoint';
interface Row {
  tanggal_surat_keluar: string;
  nomor_surat_keluar: string;
  aparaturdesa_id: string;
  nama_aparaturdesa: string;
  nama: string;
  gelar_depan: string;
  gelar_belakang: string;
  jenis_kelamin: string;
  pendidikan_terakhir: string;
  nama_panggilan: string;
  bin_binti: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  nik: string;
  kewarganegaraan: string;
  agama: string;
  pekerjaanId: string;
  alamat_desa_id: string;
  alamat_nama_desa: string;
  alamat_lengkap: string;
  tanggal_meninggal: string;
  alamat_meninggal: string;
}
export default function Venue() {
  const [url, setUrl] = useState(`${DOKUMEN_N6}`)
  const {
    data: responseData,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${url}`, {
    keepPreviousData: true,
  });
  const {
    rows: result,
    totalPage,
    totalRows,
    page,
  } = responseData || {}
  const { handleModalsTrigger, modals, rowSelected, handleRowSelected, setProcessing, processing, columns } = useStore()


  const destroyRow = async () => {
    setProcessing(true);
    try {
      const response = await axiosInstance.delete(`${DOKUMEN_N6}/${rowSelected.id}`);
      if (response?.data.success) {
        toast.success('success');
        handleModalsTrigger('alertDelete')
        mutate(false)
      } else {
        toast.error(response.data.message ?? 'fail');
      }
    } catch (e) {
      toast.error('error');

    } finally {
      setProcessing(false);

    }
  }


  const handleEdit = (row:Row) => {
    console.log(row)
  }


  const renderCell = (row: any, columnKey: React.Key | any) => {
    switch (columnKey) {
      case "nomor_surat_keluar":
        return (

          <div className='flex-1'>
            {row.nomor_surat_keluar}
          </div>
        );
      case "nama":
        return (

          <div className='flex-1'>
            {row.nama}
          </div>
        );
      case "jenis_kelamin":
        return (

          <div className='flex-1'>
            {row.jenis_kelamin}
          </div>
        );
      case "tanggal_surat_keluar":
        return (

          <div className='flex-1'>

            {dayjs(row.tanggal_surat_keluar).format('DD-MM-YYYY')}
          </div>
        );


      case "tanggal_meninggal":
        return (

          <div className='flex-1'>
            {dayjs(row.tanggal_meninggal).format('DD-MM-YYYY')}
          </div>
        );
      case "actions":
        return (
          <div className="  gap-2 flex justify-end ">
            <Button size='sm' onClick={() => handleEdit(row)} isIconOnly color="primary" startContent={<Pencil size={15} />} />
            <Button size='sm' onClick={() => handleModalsTrigger('alertDelete', row)} isIconOnly color="danger" startContent={<Trash size={15} />} />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div>
      <div className='mb-5'>
        <div className='text-2xl font-bold'>
          Dokumen Kematian (N6)
        </div>
        <div className='tracking-tighter'>
          Management data Dokumen Kematian
        </div>

      </div>
      <div className="grid gap-2 grid-cols-1">
        <div>
          <DialogDelete title='nama' rowSelected={rowSelected} processing={processing} isOpen={modals?.alertDelete} onTrigger={() => destroyRow()} />
          {result && (
            <DataTable searchingKey='nama' loading={loadingData} triggerSearch={(e: any) => setUrl(`${DOKUMEN_N6}?page=1&search=${e}`)} triggerChangePage={(e: any) => setUrl(`${DOKUMEN_N6}?page=${e}`)} data={result} page={page} totalPage={totalPage} totalRows={totalRows} columns={columns} renderCell={renderCell} rightTop={<>
              <Button as={Link} color="primary" href="/dokumen/keamtian/form" startContent={<PlusCircle />}>
                Tambah Dokumen
              </Button>
            </>} />
          )}
        </div>

      </div>
    </div>
  );
}
