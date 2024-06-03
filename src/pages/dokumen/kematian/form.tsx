import InfoFormN6 from '@/components/document/infoFormN6';
import { APARATUR, DOKUMEN_N6,  PEKERJAAN } from '@/config/endpoint';
import axiosInstance from '@/lib/axios';
import { useStore } from '@/store/FormNikahKematianStore';
import { Button, Card, CardBody, CardFooter, Divider, Link } from '@nextui-org/react'
import React, { } from 'react'
import toast from 'react-hot-toast';
import useSWR from 'swr';


const FormDokumePage = () => {
    const { step, fields, setProcessing } = useStore()

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
            console.log(fields)
        setProcessing(true);
        try {
            const response = await axiosInstance.post(`${DOKUMEN_N6}`, fields);
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
                        <InfoFormN6 aparaturSelect={responseAparaturSelect?.rows ?? []} PekerjaanSelect={responsePekerjaanSelect?.rows ?? []} />

                        <Divider className='my-5' />

                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex w-full justify-end gap-2">


                        <Button as={Link} href="/dokumen/kematian" color="default" >
                            Keluar
                        </Button>
                        <Button as={Link} href="/dokumen/kematian/form" color="danger" variant='flat' >
                            Reset Form
                        </Button>
                        <Button isDisabled={step < 2 } onClick={handlerVarifikasiForm} color="primary" >
                            Kirim Data
                        </Button>

                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}

export default FormDokumePage