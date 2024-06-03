import { useStore } from '@/store/FormNikahDocumentStore';
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import { CheckCircle2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'

type Inputs = {
    aparatId: string;
    nskp?: string;
    nskw?: string;
    tanggalAkad: string;
    statusTempatAkad: string;
    alamatTempatAkad?: string;
    saksi1: string;
    saksi2?: string;
    kuaPencatatanId: string;
    tanggalDiterimaKua: string;
    tanggalSuratKeluar: string;
    statusPemohon: string;
};
const defaultValue: Inputs = {
    aparatId: "",
    nskp: "",
    nskw: "",
    tanggalAkad: '',
    statusTempatAkad: '',
    alamatTempatAkad: "",
    saksi1: "",
    saksi2: "",
    kuaPencatatanId: "",
    tanggalDiterimaKua: '',
    tanggalSuratKeluar: '',
    statusPemohon: "",
}
const InfoForm = ({ aparaturSelect }: any) => {
    const { setFields, fields, step } = useStore();
    const [formInfo, setFormInfo] = useState(defaultValue);
    const [isDisabledFormOther, setIsDisabledFormOther] = useState({
        nskp: true,
        nskw: true,
    });
    const handleChange = useCallback((field: string, value: any) => {
        setFormInfo(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSelectChange = useCallback((field: string, value: Set<any>) => {
        setFormInfo(prev => ({ ...prev, [field]: Array.from(value)[0] }));
    }, []);

    const onSubmitVerikasi = (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        setFields('infoDocument', formInfo, 2)

    }

    useEffect(() => {
        setFormInfo(fields?.documentNikah)
    }, [false])

    useEffect(() => {
        if (formInfo?.statusPemohon) {

            if (formInfo?.statusPemohon === "1") {
                setIsDisabledFormOther({
                    nskp: false,
                    nskw: false,
                })
            } else if (formInfo?.statusPemohon === "2") {
                setIsDisabledFormOther({
                    nskp: false,
                    nskw: true,
                })
            } else if (formInfo?.statusPemohon === "3") {
                setIsDisabledFormOther({
                    nskp: true,
                    nskw: false,
                })
            } else {
                setIsDisabledFormOther({
                    nskp: true,
                    nskw: true,
                })
            }
        }
    }, [formInfo.statusPemohon])
    return (
        <div>
            <form onSubmit={onSubmitVerikasi}>
                <div className="grid grid-cols-4 gap-2 py-3">

                    <div>

                        <Select
                            items={[
                                {
                                    label: 'Balai Nikah',
                                    value: '1',
                                },
                                {
                                    label: 'Kediaman Mempelai Perempuan',
                                    value: '2',
                                },
                                {
                                    label: 'Kediaman Mempelai Laki-laki',
                                    value: '3',
                                },
                                {
                                    label: 'Masjid/Musholla',
                                    value: '4',
                                },
                                {
                                    label: 'Gedung',
                                    value: '5',
                                },
                            ]}
                            selectedKeys={[formInfo.statusTempatAkad]}
                            label="Status Tempat Akad"
                            placeholder="Pilih Status Tempat Akad"

                        // isInvalid={errors?.jabatanId ? true : false}
                        // errorMessage={errors?.jabatanId?.message}
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Select
                            items={[
                                {
                                    value: 1,
                                    label: 'Kedua Mempelai',
                                },
                                {
                                    value: 2,
                                    label: 'Hanya Mempelai Pria',
                                },
                                {
                                    value: 3,
                                    label: 'Hanya Mempelai Wanita',
                                },

                            ]}
                            label="Status Pemohon"
                            placeholder="Pilih Status Pemohon"
                            selectedKeys={[formInfo.statusPemohon]}
                            onSelectionChange={(value: any) => handleSelectChange('statusPemohon', value)}
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Input value={formInfo.nskp} isDisabled={isDisabledFormOther?.nskp}
                            onValueChange={(value) => handleChange('nskp', value)} label="NSK Mempelai Pria" isRequired={!isDisabledFormOther?.nskp} placeholder='Tanggal Surat Keluar' />
                    </div>
                    <div>
                        <Input value={formInfo.nskw} isDisabled={isDisabledFormOther?.nskw}
                            onValueChange={(value) => handleChange('nskw', value)} label="NSK Mempelai Wanita" isRequired={!isDisabledFormOther?.nskw} placeholder='Status Tempat Akad' />
                    </div>
                    <div>
                        <Input value={formInfo.tanggalSuratKeluar}
                            onValueChange={(value) => handleChange('tanggalSuratKeluar', value)} type='date' label="Tanggal Surat Keluar" isRequired placeholder='Tanggal Surat Keluar' />
                    </div>
                    <div>
                        <Input value={formInfo.tanggalDiterimaKua}
                            onValueChange={(value) => handleChange('tanggalDiterimaKua', value)} type='date' label="Tanggal Diterima di KUA" isRequired placeholder='Tanggal Diterima di KUA' />
                    </div>
                    <div>
                        <Input value={formInfo.tanggalAkad}
                            onValueChange={(value) => handleChange('tanggalAkad', value)} type="datetime-local" label="Tanggal dan Waktu Akad" isRequired placeholder='Tanggal dan Waktu Akad' />
                    </div>
                    <div>
                       
                        <Select
                            items={aparaturSelect}
                            label="TTD Aparat"
                            placeholder="Pilih Aparat"
                            selectedKeys={[formInfo.aparatId]}
                            onSelectionChange={(value: any) => handleSelectChange('aparatId', value)}
                        >
                            {(item: any) => <SelectItem key={item.id}>
                                {item.nama_aparatur}
                            </SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Input value={formInfo.kuaPencatatanId}
                            onValueChange={(value) => handleChange('kuaPencatatan', value)} label="KUA Pencatatan" placeholder='Di Tandatangani Oleh Aparat' />
                    </div>
                    <div>
                        <Input value={formInfo.kuaPencatatanId}
                            onValueChange={(value) => handleChange('nama ', value)} label="Nama Kepala KUA" placeholder='Di Tandatangani Oleh Aparat' />
                    </div>
                    <div>
                        <Input value={formInfo.kuaPencatatanId}
                            onValueChange={(value) => handleChange('kuaPencatatanId', value)} label="NIP Kepala KUA" placeholder='Di Tandatangani Oleh Aparat' />
                    </div>

                    <div>
                        <Input value={formInfo.saksi1}
                            onValueChange={(value) => handleChange('saksi1', value)} label="Saksi Pertama" isRequired placeholder='Saksi Pertama' />
                    </div>
                    <div>
                        <Input value={formInfo.saksi2}
                            onValueChange={(value) => handleChange('saksi2', value)} label="Saksi Kedua" isRequired placeholder='Saksi Kedua' />
                    </div>
                    <div>
                        <Input value={formInfo.alamatTempatAkad}
                            onValueChange={(value) => handleChange('alamatTempatAkad', value)} label="Alamat Tempat Akad" isRequired placeholder='Alamat Tempat Akad' />
                    </div>
                    <div className="col-span-4 ">
                        <div className="flex justify-center my-5">

                            {step > 1 ? (
                                <Button color="success" variant='flat'>  <CheckCircle2 /> Verifikasi Berhasil </Button>
                            ) : (<Button color='primary' type='submit'>Verifikasi Data</Button>)}


                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default InfoForm