import InfoForm from '@/components/document/infoForm';
import MempelaiForm from '@/components/document/mempelaiForm';
import OrtuForm from '@/components/document/ortuForm';
import { APARATUR, DOKUMEN_NIKAH_FORM, PEKERJAAN } from '@/config/endpoint';

import axiosInstance from '@/lib/axios';
import { useStore } from '@/store/FormNikahDocumentStore';
import { Button, Card, CardBody, CardFooter, Divider, Input, Link, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useSWR from 'swr';


const FormDokumePage = () => {
    const { step, fields,setProcessing} = useStore()

    const {
        data: responseAparaturSelect,
    } = useSWR(`${APARATUR}?pageSize=10000`, {
        keepPreviousData: true,
    });

    
    const {
        data: responsePekerjaanSelect,
    } = useSWR(`${PEKERJAAN}?pageSize=10000`, {
        keepPreviousData: true,
    });


    const handlerVarifikasiForm = async () => {
        setProcessing(true);
		try {
			const response = await axiosInstance.post(`${DOKUMEN_NIKAH_FORM}`, fields);
			if (response?.data.success) {
				toast.success('success');
				
			} else {
				toast.error(response.data.message ?? 'fail');
			}
		} catch (e) {
			toast.error('error');

		} finally {
			setProcessing(false);

		}
    }

    return (
        <div>

            <Card>
                <CardBody>
                    <div>
                        <div>
                            <h1>Data <strong>Info Dokumen</strong></h1>
                            <small>harap masukan data dengan benar  </small>
                        </div>
                        <InfoForm aparaturSelect={responseAparaturSelect?.rows ?? []} />

                        <Divider className='my-5' />
                        <div>
                            <div>
                                <h1>Data <strong> Calon Pegantin  </strong></h1>
                                <small>silahkan isi data dengan teliti</small>
                            </div>
                            <div className="grid grid-cols-2 gap-2 py-3">
                                <div className='relative'>
                                    <div className={`${step >= 2 ? 'hidden' : 'absolute inset-0 z-20 bg-white blur-sm opacity-50 rounded-xl'} `} />
                                    <MempelaiForm stepForm="2" PekerjaanSelect={responsePekerjaanSelect?.rows ?? []} type="L" label="PRIA" />
                                </div>
                                <div className='relative'>
                                    <div className={`${step >= 3 ? 'hidden' : 'absolute inset-0 z-20 bg-white blur-sm opacity-50 rounded-xl'} `} />
                                    <MempelaiForm stepForm="3" PekerjaanSelect={responsePekerjaanSelect?.rows ?? []} type="P" label="WANITA" />
                                </div>

                            </div>
                        </div>
                        <Divider className='my-5' />
                        <div className="">
                            <div>
                                <h1>Data <strong>Orang Tua / Wali</strong> Calon Pegantin </h1>
                                <small>silahkan isi data dengan teliti</small>
                            </div>
                            <div className="grid grid-cols-2 gap-2 py-3">

                                <div className="grid grid-cols-1 gap-2 py-3">
                                    <div className="relative">
                                        <div className={`${step >= 4 ? 'hidden' : 'absolute inset-0 z-20 bg-white blur-sm opacity-50 rounded-xl'} `} />
                                        <OrtuForm stepForm="4" PekerjaanSelect={responsePekerjaanSelect?.rows ?? []} type="LA" label="AYAH / WALI  MEMPELAI PRIA" />
                                    </div>
                                    <div className="relative">
                                        <div className={`${step >= 6 ? 'hidden' : 'absolute inset-0 z-20 bg-white blur-sm opacity-50 rounded-xl'} `} />
                                        <OrtuForm stepForm="6" PekerjaanSelect={responsePekerjaanSelect?.rows ?? []} type="LI" label="IBU / WALI  MEMPELAI PRIA" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-2 py-3">
                                    <div className="relative">
                                        <div className={`${step >= 5 ? 'hidden' : 'absolute inset-0 z-20 bg-white blur-sm opacity-50 rounded-xl'} `} />
                                        <OrtuForm stepForm="5" PekerjaanSelect={responsePekerjaanSelect?.rows ?? []} type="PA" label="AYAH / WALI  MEMPELAI WANITA" />
                                    </div>
                                    <div className="relative">
                                        <div className={`${step >= 7 ? 'hidden' : 'absolute inset-0 z-20 bg-white blur-sm opacity-50 rounded-xl'} `} />
                                        <OrtuForm stepForm="7" PekerjaanSelect={responsePekerjaanSelect?.rows ?? []} type="PI" label="IBU / WALI  MEMPELAI WANITA" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex w-full justify-end gap-2">


                        <Button as={Link} href="/dokumen/nikah" color="default" >
                            Keluar
                        </Button>
                        <Button as={Link} href="/dokumen/nikah/form" color="danger" variant='flat' >
                            Reset Form
                        </Button>
                        <Button isDisabled={step < 8} onClick={handlerVarifikasiForm} color="primary" >
                            Verfikasi Data
                        </Button>

                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}

export default FormDokumePage