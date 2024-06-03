

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
	DateInput,
	SelectItem,
	Select,

} from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import DataTable from '@/components/Datatable';
import useSWR from 'swr';

import DialogDelete from '@/components/DialogDelete';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mapValues } from 'lodash';
import { isObjectEmpty } from '@/lib/uitlls';

import { useStore } from '@/store/UserStore';
import { USERS_DESA, JABATAN } from '@/config/endpoint';
import PasswordInput from '@/components/passwordInput';
type Inputs = {
	nip: string;
	jabatan_id: string,
	nama_user: string,
	telp: number,
	email: string,
	password: string,

}
export default function Venue() {
	const [url, setUrl] = useState(`${USERS_DESA}`)
	const {
		data: responseJabatanSelect,
	} = useSWR(`${JABATAN}/select`, {
		keepPreviousData: true,
	});
	const {
		data: responseData,
		mutate: mutate,
		isLoading: loadingData,
	} = useSWR(`${url}`, {
		keepPreviousData: true,
	});

	console.log(typeof responseJabatanSelect)
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
			nip: rowSelected?.nip,
			jabatan_id: rowSelected?.jabatan_id,
			nama_user: rowSelected?.nama_user,
			telp: rowSelected?.telp,
			email: rowSelected?.email,
			password: '',

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
				response = await axiosInstance.post(`${USERS_DESA}`, data);
			} else {
				response = await axiosInstance.patch(`${USERS_DESA}?id=${rowSelected.id}`, data);
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
			const response = await axiosInstance.delete(`${USERS_DESA}?id=${rowSelected.id}`);
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
			case "nama_user":
				return (

					<div className='flex-1'>
						{row.nama_user}
					</div>
				);
			case "nip":
				return (

					<div className='flex-1'>
						{row.nip}
					</div>
				);

			case "email":
				return (

					<div className='flex-1'>
						{row.email}
					</div>
				);
			case "telp":
				return (

					<div className='flex-1'>
						{row.telp}
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
					Master Data Aparatur
				</div>
				<div className='tracking-tighter'>
					Management data aparatur anda
				</div>

			</div>
			<div className="grid gap-2 grid-cols-3">
				<div className='col-span-2'>
					<DialogDelete title='nama' rowSelected={rowSelected} processing={processing} isOpen={modals?.alertDelete} onTrigger={() => destroyRow()} />
					{rows && (
						<DataTable searchingKey='nama' loading={loadingData} triggerSearch={(e: any) => setUrl(`${USERS_DESA}?page=1&q=${e}`)} triggerChangePage={(e: any) => setUrl(`${USERS_DESA}?page=${e}`)} data={rows} page={page} totalPage={totalPage} totalRows={totalRows} columns={columns} renderCell={renderCell} rightTop={<>
							<Button color="primary" onClick={() => resetForm()} startContent={<PlusCircle />}>
								Tambah User
							</Button>
						</>} />
					)}
				</div>
				<div className="flex-none w-74">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Card>
							<CardHeader>
								<div>
									<h1 className='font-semibold'>{isObjectEmpty(rowSelected) ? 'Tambah User' : 'Edit User'}</h1>

								</div>
							</CardHeader>
							<CardBody>
								<Divider />
								<div className="grid grid-cols-1 gap-2 mt-2">
									<div>
										<SectionForm>
											<Input
												type="text"
												label="Nama User"
												placeholder='Masukan Nama User'
												{...register("nama_user")}
												isInvalid={errors?.nama_user ? true : false}
												errorMessage={errors?.nama_user?.message}
											/>
										</SectionForm>


									</div>
									<div>
										<SectionForm>
											<Input
												type="email"
												label="Email"
												placeholder='Masukan Email'
												{...register("email")}
												isInvalid={errors?.email ? true : false}
												errorMessage={errors?.email?.message}
											/>
										</SectionForm>
									</div>
									
									<div>
										<SectionForm>
											<Input
												type="number"
												label="NIP"
												placeholder='Masukan NIP'
												{...register("nip")}
												isInvalid={errors?.nip ? true : false}
												errorMessage={errors?.nip?.message}
											/>
										</SectionForm>
									</div>
									<div>
										<SectionForm>
											<Input
												type="number"
												label="Telepon"
												placeholder='Masukan Telepon'
												{...register("telp")}
												isInvalid={errors?.telp ? true : false}
												errorMessage={errors?.telp?.message}
											/>
										</SectionForm>
									</div>
									<div>

										<SectionForm>

											<Select
												items={responseJabatanSelect?.result ?? []}
												label="Favorite Animal"
												placeholder="Select an animal"
												{...register("jabatan_id")}
												isInvalid={errors?.jabatan_id ? true : false}
												errorMessage={errors?.jabatan_id?.message}
											>
												{(item: any) => <SelectItem key={item.id}>{item.nama}</SelectItem>}
											</Select>
										</SectionForm>


									</div>
									<div>

										<SectionForm>
											<PasswordInput
												description={<div className='text-danger'>{rowSelected && 'Biarkan kosong jika Anda tidak ingin mengubah kata sandi'}</div>}
												type="password"
												label="Password"
												placeholder='Masukan Password'
												{...register("password")}
												isInvalid={errors?.password ? true : false}
												errorMessage={errors?.password?.message}
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
