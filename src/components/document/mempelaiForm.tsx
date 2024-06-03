

import React, { useEffect, useState, useCallback } from 'react';
import { useStore } from '@/store/FormNikahDocumentStore';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';

import { CheckCircle2 } from 'lucide-react';

interface MempelaiFormProps {
    PekerjaanSelect: { id: string, nama: string }[];
    label: string;
    type: 'P' | 'L';
    stepForm: any

}

type Inputs = {
    nama: string;
    gender: string; // Gunakan Union Type untuk gender
    alias: string;
    pendidikan: string;
    tempatLahir: string;
    tanggalLahir: string;
    gelarDepan?: string;
    gelarBelakang?: string;
    nik: string;
    alamatDesaId: string;
    statusWargaNegara: string;
    pekerjaanId: string;
    agama: string;
    telepon: string;
    statusPerkawinan: string;
    pasanganKe: string;
    n6Id: string;
};

const defaultValue: Inputs = {
    nama: "",
    agama: "",
    alias: "",
    nik: "",
    alamatDesaId: "",
    pekerjaanId: "",
    gelarDepan: "",
    gelarBelakang: "",
    pendidikan: "",
    gender: "L",
    tempatLahir: "",
    tanggalLahir: "",
    statusWargaNegara: "WNI",
    telepon: "",
    statusPerkawinan: "",
    pasanganKe: "",
    n6Id: "",
}

const MempelaiForm: React.FC<MempelaiFormProps> = ({ PekerjaanSelect, label, type, stepForm }) => {
    const { setFields, step, fields } = useStore();

    const [pemohon, setPemohon] = useState(defaultValue);

    const statusPernikahan = type === 'P' ? [
        { label: "Perawan", value: "Perawan" },
        { label: "Janda (Cerai Mati) Terdaftar", value: "Janda (Cerai Mati) Terdaftar" },
        { label: "Janda (Cerai Mati)", value: "Janda (Cerai Mati)" },
        { label: "Janda (Cerai Hidup)", value: "Janda (Cerai Hidup)" },
        { label: "Bersuami", value: "Bersuami" }
    ] : [
        { label: "Jejaka", value: "Jejaka" },
        { label: "Duda (Cerai Mati) Terdaftar", value: "Duda (Cerai Mati) Terdaftar" },
        { label: "Duda (Cerai Mati)", value: "Duda (Cerai Mati)" },
        { label: "Duda (Cerai Hidup)", value: "Duda (Cerai Hidup)" },
        { label: "Beristri", value: "Beristri" }
    ];

    const handleChange = useCallback((field: string, value: any) => {
        setPemohon(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSelectChange = useCallback((field: string, value: Set<any>) => {
        setPemohon(prev => ({ ...prev, [field]: Array.from(value)[0] }));
    }, []);

    const onSubmitVeriikasi = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(pemohon)
        setFields(type === 'P' ? 'pemohonWanita' : 'pemohonPria', pemohon, type === 'P' ? 4 : 3)

    }

    // // const {
    // //     register,
    // //     handleSubmit,
    // //     setValue,
    // //     reset,
    // //     formState: { errors },
    // // } = useForm<Inputs>({
    // //     mode: 'onBlur',
    // //     values: { ...defaultValue },
    // //     resetOptions: {
    // //         keepDirtyValues: true,
    // //     },
    // // })
    // const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //     console.log(data)
    //     setFields(type === 'P' ? 'pemohonWanita' : 'pemohonPria', pemohon)

    // }
    useEffect(() => {

        setPemohon(fields?.[type === 'P' ? 'pemohonWanita' : 'pemohonPria'])
    }, [false])

    return (
        <div>
            <form onSubmit={onSubmitVeriikasi}>
                <div className="grid grid-cols-2 gap-2 py-3 border p-3 rounded-lg">
                    <div className="col-span-2">
                        <div className="my-2 font-bold">{label}</div>
                    </div>
                    <div>
                        <Input
                            value={pemohon.nama}
                            onValueChange={(value) => handleChange('nama', value)}
                            label="Nama Lengkap"
                            placeholder="Nama Lengkap"
                            isRequired
                        />
                    </div>
                    <div>
                        <Input
                            type="number"
                            value={pemohon.nik}
                            onValueChange={(value) => handleChange('nik', value)}
                            label="NIK"
                            placeholder="NIK"
                            isRequired
                        />
                    </div>
                    <div>
                        <Input
                            value={pemohon.gelarDepan}
                            onValueChange={(value) => handleChange('gelarDepan', value)}
                            label="Gelar Depan"
                            placeholder="AA"
                        />
                    </div>
                    <div>
                        <Input
                            value={pemohon.gelarBelakang}
                            onValueChange={(value) => handleChange('gelarBelakang', value)}
                            label="Gelar Belakang"
                            placeholder="AA"
                        />
                    </div>
                    <div>
                        <Select
                            items={[
                                { label: "WNA", value: "WNA" },
                                { label: "WNI", value: "WNI" },
                            ]}
                            defaultSelectedKeys={new Set([pemohon.statusWargaNegara])}
                            onSelectionChange={(value: any) => handleSelectChange('statusWargaNegara', value)}
                            label="Status Kewarganegaraan"
                            placeholder="Pilih Status Kewarganegaraan"
                            isRequired
                        >

                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
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
                            selectedKeys={[pemohon.pendidikan]}
                            isRequired
                            onSelectionChange={(value: any) => handleSelectChange('pendidikan', value)}
                            label="Pendidikan Terakhir"
                            placeholder="Pilih Pendidikan Terakhir"
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Input
                            isRequired
                            value={pemohon.tempatLahir}
                            onValueChange={(value) => handleChange('tempatLahir', value)}
                            label="Tempat Lahir"
                            placeholder="Tempat Lahir"
                        />
                    </div>
                    <div>
                        <Input
                            isRequired
                            type="date"
                            value={pemohon.tanggalLahir}
                            onValueChange={(value) => handleChange('tanggalLahir', value)}
                            label="Tanggal Lahir"

                            placeholder="Tanggal Lahir"
                        />
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
                            selectedKeys={[pemohon.agama]}
                            onSelectionChange={(value: any) => handleSelectChange('agama', value)}
                            label="Agama"
                            placeholder="Pilih Agama"
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Input
                            type="number"
                            value={pemohon.telepon}
                            onValueChange={(value: any) => handleChange('telepon', value)}
                            label="Nomor Telepon"
                            placeholder="Nomor Telepon"
                        />
                    </div>
                    <div>
                        <Select
                            items={PekerjaanSelect}
                            label="Pekerjaan"
                            selectedKeys={[pemohon.pekerjaanId]}
                            placeholder="Pilih Pekerjaan"
                            onSelectionChange={(value: any) => handleSelectChange('pekerjaanId', value)}
                        >
                            {(item: any) => <SelectItem key={item.id}>{item.nama}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Select
                            items={statusPernikahan}
                            label="Status Perkawinan"
                            isRequired
                            selectedKeys={[pemohon.statusPerkawinan]}
                            placeholder="Pilih Status Perkawinan"
                            onSelectionChange={(value: any) => handleSelectChange('statusPerkawinan', value)}
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>

                        {pemohon.statusPerkawinan === 'Duda (Cerai Mati) Terdaftar' || pemohon.statusPerkawinan === 'Janda (Cerai Mati) Terdaftar' ? 'aaa' : 'bbb'}

                    </div>
{/* 
                    <div className='border col-span-2 p-2'>
                        <div className="grid grid-cols-2 gap-2">
                            
                        </div>
                    </div> */}

                    <div className="col-span-2 ">
                        <div className="flex justify-center my-5">

                            {stepForm < step ? (
                                <Button color="success" variant='flat'>  <CheckCircle2 /> Verifikasi Berhasil </Button>
                            ) : (<Button color='primary' type='submit'>Verifikasi Data</Button>)}


                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MempelaiForm;
