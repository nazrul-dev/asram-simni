
import dayjs from 'dayjs'
import { Pencil, PlusCircle, Trash } from 'lucide-react';
import React, { ReactNode, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	CardFooter,
	Divider,

} from "@nextui-org/react";
import DataTable from '@/components/Datatable';
import useSWR from 'swr';

import DialogDelete from '@/components/DialogDelete';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mapValues } from 'lodash';

import { isObjectEmpty } from '@/lib/uitlls';

import { useStore } from '@/store/DocumentStore';
import Link from 'next/link';
import { DOKUMEN_NIKAH } from '@/config/endpoint';

export default function Venue() {
	const [url, setUrl] = useState(`${DOKUMEN_NIKAH}`)
	const {
		data: responseData,
		mutate: mutate,
		isLoading: loadingData,
	} = useSWR(`${url}`, {
		keepPreviousData: true,
	});
	const {
		result,
		totalPage,
		totalRows,
		page,
	} = responseData || {}
	const { handleModalsTrigger, modals, rowSelected, handleRowSelected, setProcessing, processing, columns } = useStore()


	const destroyRow = async () => {
		setProcessing(true);
		try {
			const response = await axiosInstance.delete(`${DOKUMEN_NIKAH}?id=${rowSelected.id}`);
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




	const renderCell = (row: any, columnKey: React.Key | any) => {
		switch (columnKey) {
			case "tanggalAkad":
				return (

					<div className='flex-1'>

						{dayjs(row.tanggalAkad).format('DD-MM-YYYY')}
					</div>
				);

			case "kuaPencatatanId":
				return (

					<div className='flex-1'>
						{row.kuaPencatatanId}
					</div>
				);

			case "tanggalDiterimaKua":
				return (

					<div className='flex-1'>
						{dayjs(row.tanggalDiterimaKua).format('DD-MM-YYYY')}
					</div>
				);

				case "statusPemohon":
				return (

					<div className='flex-1'>
						{row.statusPemohon}
					</div>
				);
			case "nskl":
				return (

					<div className='flex-1'>
						{row.pemohon?.NSKPria}
					</div>
				);
			case "nskp":
				return (

					<div className='flex-1'>
						{row.pemohon?.NSKWanita}
					</div>
				);

			case "actions":
				return (
					<div className="  gap-2 flex justify-end ">
						{/* <Button size='sm' onClick={() => handleEdit(row)} isIconOnly color="primary" startContent={<Pencil size={15} />} /> */}
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
					Master Data Pekerjaan
				</div>
				<div className='tracking-tighter'>
					Management data pekerjaan anda
				</div>

			</div>
			<div className="grid gap-2 grid-cols-1">
				<div>
					<DialogDelete title='nama' rowSelected={rowSelected} processing={processing} isOpen={modals?.alertDelete} onTrigger={() => destroyRow()} />
					{result && (
						<DataTable searchingKey='nama' loading={loadingData} triggerSearch={(e: any) => setUrl(`${DOKUMEN_NIKAH}?page=1&search=${e}`)} triggerChangePage={(e: any) => setUrl(`${DOKUMEN_NIKAH}?page=${e}`)} data={result} page={page} totalPage={totalPage} totalRows={totalRows} columns={columns} renderCell={renderCell} rightTop={<>
							<Button as={Link}  color="primary" href="/dokumen/nikah/form" startContent={<PlusCircle />}>
								Tambah Dokumen
							</Button>
						</>} />
					)}
				</div>

			</div>
		</div>
	);
}
