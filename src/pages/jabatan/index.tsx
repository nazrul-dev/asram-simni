

import { Pencil, PlusCircle, Trash } from 'lucide-react';
import React, { ReactNode, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	CardFooter,
	Divider
} from "@nextui-org/react";
import DataTable from '@/components/Datatable';
import useSWR from 'swr';

import DialogDelete from '@/components/DialogDelete';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mapValues } from 'lodash';
import { isObjectEmpty } from '@/lib/uitlls';

import { useStore } from '@/store/JabatanStore';
import { JABATAN } from '@/config/endpoint';
type Inputs = {
	nama_jabatan: string
}
export default function Venue() {
	const [url, setUrl] = useState(`${JABATAN}`)
	const {
		data: responseData,
		mutate: mutate,
		isLoading: loadingData,
	} = useSWR(`${url}`, {
		keepPreviousData: true,
	});
	const {
		rows,
		totalPage,
		totalRows,
		page,
	} = responseData || {}
	const { handleModalsTrigger, modals, rowSelected, handleRowSelected, setProcessing, processing, columns } = useStore()
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onBlur',
		values: {
			nama_jabatan: rowSelected?.nama_jabatan ?? '',
		},
		resetOptions: {
			keepDirtyValues: true,
		},
	})
	const onSubmit: SubmitHandler<Inputs> = async (data) => {

		setProcessing(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		try {
			let response;
			if (isObjectEmpty(rowSelected)) {
				response = await axiosInstance.post(`${JABATAN}`, data);
			} else {
				response = await axiosInstance.put(`${JABATAN}/${rowSelected.id}`, data);
			}
			if (response?.data.success) {
				toast.success('success');
				mutate(false)
				resetForm()
			} else {
				toast.error(response.data.message ?? 'fail');
			}
		} catch (e) {
			toast.error('error');
			console.log(e)
		} finally {
			setProcessing(false);

		}
	}

	const destroyRow = async () => {
		setProcessing(true);
		try {
			const response = await axiosInstance.delete(`${JABATAN}/${rowSelected.id}`);
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
	const handleEdit = (row: Inputs) => {
		handleRowSelected(row)
		mapValues(rowSelected, (key, value) => setValue(key, value))
	}

	const resetForm = () => {
		handleRowSelected()
		reset()
	}


	const SectionForm = ({ children }: { children: ReactNode }) => {
		return children
	}


	const renderCell = (row: any, columnKey: React.Key | any) => {
		switch (columnKey) {
			case "nama_jabatan":
				return (

					<div className='flex-1'>
						{row.nama_jabatan}
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
					Master Data Jabatan
				</div>
				<div className='tracking-tighter'>
					Management data jabatan anda
				</div>

			</div>
			<div className="grid gap-2 grid-cols-3">
				<div className='col-span-2'>
					<DialogDelete title='nama_jabatan' rowSelected={rowSelected} processing={processing} isOpen={modals?.alertDelete} onTrigger={() => destroyRow()} />
					{rows && (
						<DataTable searchingKey='nama_jabatan' loading={loadingData} triggerSearch={(e: any) => setUrl(`${JABATAN}?page=1&search=${e}`)} triggerChangePage={(e: any) => setUrl(`${JABATAN}?page=${e}`)} data={rows} page={page} totalPage={totalPage} totalRows={totalRows} columns={columns} renderCell={renderCell} rightTop={<>
							<Button color="primary" onClick={() => resetForm()} startContent={<PlusCircle />}>
								Tambah Jabatan
							</Button>
						</>} />
					)}
				</div>
				<div className="flex-none w-74">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Card>
							<CardHeader>
								<div>
									<h1 className='font-semibold'>{isObjectEmpty(rowSelected) ? 'Tambah Jabatan' : 'Edit Jabatan'}</h1>

								</div>
							</CardHeader>
							<CardBody>
								<Divider />
								<div className="grid grid-cols-1 gap-2 mt-2">
									<div>
										<SectionForm>
											<Input
												type="text"
												label="Nama Jabatan"
												placeholder='Masukan Nama Jabatan'
												{...register("nama_jabatan")}
												isInvalid={errors?.nama_jabatan ? true : false}
												errorMessage={errors?.nama_jabatan?.message}
											/>
										</SectionForm>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<div className="flex w-full justify-end gap-2 mt-3">
									{!!!isObjectEmpty(rowSelected) && (
										<Button color="danger" onClick={() => resetForm()} variant="flat" >
											Reset Form
										</Button>
									)}
									<Button isDisabled={processing} isLoading={processing} type='submit' color="primary" >
										Simpan
									</Button>
								</div>
							</CardFooter>
						</Card>
					</form>
				</div>
			</div>
		</div>
	);
}
