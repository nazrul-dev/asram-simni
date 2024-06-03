import { useStore } from '@/store/FormNikahDocumentStore';
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { CheckCircle2 } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
type Inputs = {
    statusHidup: string;
    nama: string;
    binti?: string;
    gender: string; // Gunakan Union Type untuk gender
    tempatLahir?: string;
    tanggalLahir?: string;
    nik?: string;
    statusWargaNegara?: string;
    agama?: string;
    pekerjaanId?: string;
    pendidikan?: string;
};

const defaultValue: Inputs = {
    statusHidup: "1",
    nama: "",
    binti: "",
    gender: "",
    tempatLahir: "",
    tanggalLahir: "",
    nik: "",
    statusWargaNegara: "",
    agama: "",
    pendidikan: "",
    pekerjaanId: "",
}
const OrtuForm = ({ label, PekerjaanSelect, stepForm, type }: any) => {

    const { fields, setFields, step } = useStore();
    const [typeKey, setTypeKey] = useState<any>(null);
    const [formOrtu, setFormOrtu] = useState(defaultValue);
    const [isDisabledFormOther, setIsDisabledFormOther] = useState(false);


    const handleChange = useCallback((field: string, value: any) => {
        setFormOrtu(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSelectChange = useCallback((field: string, value: Set<any>) => {
        setFormOrtu(prev => ({ ...prev, [field]: Array.from(value)[0] }));
    }, []);

    const onSubmitVerikasi = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log(formOrtu)


        let step;
        if (type === 'LA') {
            step = 5;
        } else if (type === 'LI') {
            step = 7;
        } else if (type === 'PA') {
            step = 6;
        } else if (type === 'PI') {
            step = 8;
        }


        setFields(typeKey, formOrtu, step)

    }


    useEffect(() => {
        if (formOrtu?.statusHidup) {

            if (formOrtu?.statusHidup === '1') {
                setIsDisabledFormOther(false)
            } else if (formOrtu?.statusHidup === "0") {
                setIsDisabledFormOther(true)
            } else {
                setIsDisabledFormOther(false)
            }
        }
    }, [formOrtu.statusHidup])

    useEffect(() => {

        let key;
        if (type === 'LA') {
            key = 'ortuAyahPria'
        } else if (type === 'LI') {
            key = 'ortuIbuPria'

        } else if (type === 'PA') {
            key = 'ortuAyahWanita'

        } else if (type === 'PI') {
            key = 'ortuIbuWanita'

        }

        setTypeKey(key)
        setFormOrtu(fields?.[key as string])
    }, [false])


    return (
        <div>
            <form onSubmit={onSubmitVerikasi}>
                <div className="grid grid-cols-2 gap-2 py-3 border p-3 rounded-lg ">

                    <div className="col-span-2">

                        <div className='my-2 font-bold'>
                            {label}
                        </div>
                    </div>
                    <Select
                        items={
                            [
                                { label: "Hidup", value: "1" },
                                { label: "Wafat", value: "0" },
                            ]
                        }
                        selectedKeys={[formOrtu.statusHidup]}
                        label="Status Hidup"
                        onSelectionChange={(value: any) => handleSelectChange('statusHidup', value)}
                        placeholder="Pilih Status Hidup"
                    >
                        {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                    </Select>
                    <div>
                        <Input isRequired={!isDisabledFormOther} isDisabled={isDisabledFormOther} value={formOrtu.nik}
                            onValueChange={(value) => handleChange('nik', value)} label="NIK" placeholder='NIK' />
                    </div>

                    <div>
                        <Input value={formOrtu.nama} isRequired={true}
                            onValueChange={(value) => handleChange('nama', value)} label="Nama Lengkap" placeholder='Nama Lengkap' />
                    </div>
                    <div>
                        <Input isRequired={!isDisabledFormOther} isDisabled={isDisabledFormOther} value={formOrtu.binti}
                            onValueChange={(value) => handleChange('binti', value)} label="Binti" placeholder='Binti' />
                    </div>

                    <div>
                        <Select isRequired={!isDisabledFormOther} isDisabled={isDisabledFormOther}
                            items={
                                [
                                    { label: "WNA", value: "WNA" },
                                    { label: "WNI", value: "WNI" },
                                ]
                            }
                            selectedKeys={[formOrtu?.statusWargaNegara as any]}
                            label="Status Kewarganegaraan"
                            onSelectionChange={(value: any) => handleSelectChange('statusWargaNegara', value)}
                            placeholder="Pilih Status Kewarganegaraan"
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Select
                            items={
                                [
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
                                    { label: "S3", value: "S3" }
                                ]
                            }
                            selectedKeys={[formOrtu?.pendidikan as any]}
                            isRequired={!isDisabledFormOther} isDisabled={isDisabledFormOther}
                            label="Pendidikan Terakhir"
                            onSelectionChange={(value: any) => handleSelectChange('pendidikan', value)}
                            placeholder="Pilih Pendidikan Terakhir"
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Input
                            isRequired={!isDisabledFormOther} isDisabled={isDisabledFormOther} value={formOrtu.tempatLahir}
                            onValueChange={(value) => handleChange('tempatLahir', value)} label="Tempat Lahir" placeholder='Tempat Lahir' />
                    </div>
                    <div>
                        <Input
                            isRequired={!isDisabledFormOther} isDisabled={isDisabledFormOther} value={formOrtu.tanggalLahir}
                            onValueChange={(value) => handleChange('tanggalLahir', value)} type='date' label="Tanggal Lahir" placeholder='Tanggal Lahir' />
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
                            selectedKeys={[formOrtu.agama as any]}
                            isRequired={!isDisabledFormOther} isDisabled={isDisabledFormOther}
                            label="Agama"
                            placeholder="Pilih Agama"
                            onSelectionChange={(value: any) => handleSelectChange('agama', value)}
                        >
                            {(item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>}
                        </Select>
                    </div>

                    <div >
                        <Select
                            isRequired={!isDisabledFormOther} isDisabled={isDisabledFormOther}
                            items={PekerjaanSelect}
                            label="Pekerjaan"
                            placeholder="Pilih Pekerjaan"
                            onSelectionChange={(value: any) => handleSelectChange('pekerjaanId', value)}
                            selectedKeys={[formOrtu.pekerjaanId as any]}
                        >
                            {(item: any) => <SelectItem key={item.id}>{item.nama}</SelectItem>}
                        </Select>
                    </div>
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
    )
}

export default OrtuForm