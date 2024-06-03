import { useStore } from '@/store/FormNikahKematianStore';
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import { CheckCircle2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'

interface Inputs {
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

const defaultValue: Inputs = {
    tanggal_surat_keluar: "2024-06-01",
    nomor_surat_keluar: "X10/567/DESA/1020394/2024",
    aparaturdesa_id: "885ca460-4b5e-485d-9883-ef945c4878de",
    nama_aparaturdesa: "AGUS WALUYO",
    nama: "Almarhuma",
    gelar_depan: "",
    gelar_belakang: "",
    jenis_kelamin: "Laki-laki",
    pendidikan_terakhir: "SD",
    nama_panggilan: "Almarhuma",
    bin_binti: "Almarhuma",
    tempat_lahir: "Tangerang",
    tanggal_lahir: "1985",
    nik: "867868968687678687",
    kewarganegaraan: "Indonesia",
    agama: "Islam",
    pekerjaanId: "Wiraswasta",
    alamat_desa_id: "1101010001",
    alamat_nama_desa: "LATIUNG",
    alamat_lengkap: "LATIUNG",
    tanggal_meninggal: "2024-01-01",
    alamat_meninggal: ""
};


const InfoFormN6 = ({ aparaturSelect, PekerjaanSelect }: any) => {
    const { setFields, fields, step } = useStore();
    const [formInfo, setFormInfo] = useState(defaultValue);
 
    const handleChange = useCallback((field: string, value: any) => {
        setFormInfo(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSelectChange = useCallback((field: string, value: Set<any>) => {
        setFormInfo(prev => ({ ...prev, [field]: Array.from(value)[0] }));
    }, []);

    const onSubmitVerikasi = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setFields(formInfo, 2)

    }

    useEffect(() => {
        setFormInfo(fields?.documentNikah)
    }, [false])


    return (
        <div>
            <form onSubmit={onSubmitVerikasi}>
                <div className="grid grid-cols-4 gap-2 py-3">

                    <div>
                        <Input   isRequired value={formInfo?.nomor_surat_keluar}
                            onValueChange={(value) => handleChange('nomor_surat_keluar', value)} label="Nomor Surat Keluar" placeholder='Nomor Surat Keluar' />
                    </div>
                    <div>
                        <Input   isRequired value={formInfo?.tanggal_surat_keluar}
                            onValueChange={(value) => handleChange('tanggal_surat_keluar', value)} type='date' label="Tanggal Surat Keluar" placeholder='Tanggal Surat Keluar' />
                    </div>
                    <div>

                        <Select
                          isRequired
                            items={aparaturSelect}
                            label="TTD Aparat"
                            placeholder="Pilih Aparat"
                            selectedKeys={[formInfo?.aparaturdesa_id]}
                            onSelectionChange={(value: any) => handleSelectChange('aparaturdesa_id', value)}
                        >
                            {(item: any) => <SelectItem key={item.id}>
                                {item.nama_aparatur}
                            </SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Input

                            value={formInfo?.nama}
                            onValueChange={(value) => handleChange('nama', value)}
                            label="Nama Lengkap"
                            placeholder="Nama Lengkap"
                            isRequired
                        />
                    </div>
                    <div>
                        <Input
                            value={formInfo?.bin_binti}
                            onValueChange={(value) => handleChange('bin_binti', value)}
                            label="Binti"
                            placeholder="Binti"
                            isRequired
                        />
                    </div>
                    <div>
                        <Input
                            value={formInfo?.nama_panggilan}
                            onValueChange={(value) => handleChange('nama_panggilan', value)}
                            label="Nama Panggilan"
                            placeholder="Nama Panggilan"
                            isRequired
                        />
                    </div>
                    <div>
                        <Input
                            value={formInfo?.gelar_depan}
                            onValueChange={(value) => handleChange('gelar_depan', value)}
                            label="Gelar Depan"
                            placeholder="Gelar Depan"
                        />
                    </div>
                    <div>
                        <Input
                            value={formInfo?.gelar_belakang}
                            onValueChange={(value) => handleChange('gelar_belakang', value)}
                            label="Gelar Belakang"
                            placeholder="Gelar Belakang"
                        />
                    </div>
                    <div>
                        <Select
                            items={[
                                { label: "Laki laki", value: "L" },
                                { label: "Perempuan", value: "P" },
                            ]}
                            defaultSelectedKeys={new Set([formInfo?.jenis_kelamin])}
                            onSelectionChange={(value: any) => handleSelectChange('jenis_kelamin', value)}
                            label="Jenis Kelamin"
                            placeholder="Pilih Status Jenis Kelamin"
                            isRequired
                        >

                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Input
                            type="number"
                            value={formInfo?.nik}
                            onValueChange={(value) => handleChange('nik', value)}
                            label="NIK"
                            placeholder="NIK"
                            isRequired
                        />
                    </div>

                    <div>
                        <Select
                            items={[
                                { label: "-", value: "Tidak Tamat SD" },
                                { label: "SD", value: "SD/Sederajat" },
                                { label: "SMP", value: "SMP/Sederajat" },
                                { label: "SMA", value: "SMA/Sederajat" },
                                { label: "D1", value: "D1" },
                                { label: "D2", value: "D2" },
                                { label: "D3", value: "D3" },
                                { label: "D4", value: "D4" },
                                { label: "S1", value: "S1" },
                                { label: "S2", value: "S2" },
                                { label: "S3", value: "S3" },
                            ]}
                            selectedKeys={[formInfo?.pendidikan_terakhir]}
                            isRequired
                            onSelectionChange={(value: any) => handleSelectChange('pendidikan_terakhir', value)}
                            label="Pendidikan Terakhir"
                            placeholder="Pilih Pendidikan Terakhir"
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Select
                          isRequired
                            items={PekerjaanSelect}
                            label="Pekerjaan"
                            selectedKeys={[formInfo?.pekerjaanId]}
                            placeholder="Pilih Pekerjaan"
                            onSelectionChange={(value: any) => handleSelectChange('pekerjaanId', value)}
                        >
                            {(item: any) => <SelectItem key={item.id}>{item.nama_pekerjaan}</SelectItem>}
                        </Select>
                    </div>

                    <div>
                        <Select
                            items={[
                                { label: "WNA", value: "WNA" },
                                { label: "WNI", value: "WNI" },
                            ]}
                            defaultSelectedKeys={new Set([formInfo?.kewarganegaraan])}
                            onSelectionChange={(value: any) => handleSelectChange('kewarganegaraan', value)}
                            label="Kewarganegaraan"
                            placeholder="Pilih Status Kewarganegaraan"
                            isRequired
                        >

                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>

                        <Select
                            items={[
                                { value: "islam", label: "Islam" },
                                { value: "kristen Protestan", label: "Kristen Protestan" },
                                { value: "katolik", label: "Katolik" },
                                { value: "hindu", label: "Hindu" },
                                { value: "buddha", label: "Buddha" },
                                { value: "konghucu", label: "Kong Hu Cu" },
                                { value: "lainnya", label: "Lainnya" },
                            ]}
                            isRequired
                            selectedKeys={[formInfo?.agama]}
                            onSelectionChange={(value: any) => handleSelectChange('agama', value)}
                            label="Agama"
                            placeholder="Pilih Agama"
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Input   isRequired value={formInfo?.tempat_lahir}
                            onValueChange={(value) => handleChange('tempat_lahir', value)} label="Tempat Lahir"  placeholder='Tempat Lahir' />
                    </div>
                    <div>
                        <Input
                            isRequired
                            type="date"
                            value={formInfo?.tanggal_lahir}
                            onValueChange={(value) => handleChange('tanggal_lahir', value)}
                            label="Tanggal Lahir"
                            placeholder="Tanggal Lahir"
                        />
                    </div>

                    <div>
                        <Input
                            isRequired
                            type="date"
                            value={formInfo?.tanggal_meninggal}
                            onValueChange={(value) => handleChange('tanggal_meninggal', value)}
                            label="Tanggal Lahir"
                            placeholder="Tanggal Lahir"
                        />
                    </div>
                    <div>
                        <Input
                          
                        
                            value={formInfo?.alamat_meninggal}
                            onValueChange={(value) => handleChange('alamat_meninggal', value)}
                            label="Alamat Meninggal"
                            placeholder="Alamat Meninggal"
                        />
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

export default InfoFormN6