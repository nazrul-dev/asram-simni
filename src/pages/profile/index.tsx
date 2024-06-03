import React, { useState, ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import { useStore } from '@/store/ProfileStore';
import { useSession } from 'next-auth/react';
import PasswordInput from '@/components/passwordInput';
import axiosInstance from '@/lib/axios';
import { CHANGE_PASSWORD, CHANGE_PROFILE, MYPROFILE } from '@/config/endpoint';

type InputProfile = {
    nama_user?: string;
    telp?: string;
};

type InputSecurity = {
    password?: string;
    confirmPassword?: string;
};

type FormInputs<Tab extends 'profile' | 'security'> = Tab extends 'profile' ? InputProfile : InputSecurity;

const ProfilePage = () => {
    const [tab, setTab] = useState<'profile' | 'security'>('profile');
    const { setProcessing, processing } = useStore();
    const { data: responseData, isLoading: loadingData } = useSWR(MYPROFILE, {
        keepPreviousData: true,
    });
    const { result } = responseData || {};

    const values = tab === 'profile'
        ? { nama_user: result?.nama_user ?? '', telp: result?.telp ?? '' }
        : { password: '', confirmPassword: '' };

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        mode: 'onBlur',
        values: values,
        resetOptions: {
            keepDirtyValues: true,
        },
    });

    const SectionForm = ({ children }: { children: ReactNode }) => {
        return <>{children}</>;
    };

    const onSubmit: SubmitHandler<FormInputs<typeof tab>> = async (data) => {
        setProcessing(true);
        try {
            const response = tab === 'profile'
                ? await axiosInstance.post(CHANGE_PROFILE, data)
                : await axiosInstance.post(CHANGE_PASSWORD, data);

            if (response?.data.success) {
                toast.success('Success');
            } else {
                toast.error(response.data.message ?? 'Fail');
            }
        } catch (error) {
            toast.error('Error');
            console.error(error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-4 gap-2">
                <div>
                    <Card>
                        <CardBody>
                            <div className="flex flex-col gap-2">
                                <Button
                                    color={tab === 'profile' ? 'primary' : 'default'}
                                    onClick={() => setTab('profile')}
                                >
                                    Profile
                                </Button>
                                <Button
                                    color={tab === 'security' ? 'primary' : 'default'}
                                    onClick={() => setTab('security')}
                                >
                                    Keamanan
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-span-3">
                    {tab === 'profile' && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Card>
                                <CardBody>
                                    <div className="grid grid-cols-2 gap-2">
                                        <SectionForm>
                                            <Input
                                                type="text"
                                                label="Email"
                                                placeholder="Masukan Email"
                                                disabled

                                                value={result?.email}

                                            />
                                        </SectionForm>
                                        <SectionForm>
                                            <Input
                                                type="text"
                                                label="NIP"
                                                placeholder="Masukan Nama User"
                                                disabled

                                                value={result?.nip}
                                            />
                                        </SectionForm>

                                        <SectionForm>
                                            <Input
                                                type="text"
                                                label="Nama User"
                                                placeholder="Masukan Nama User"
                                                {...register('nama_user')}
                                                isInvalid={!!errors?.nama_user as any}
                                                errorMessage={errors?.nama_user?.message as any}
                                            />
                                        </SectionForm>
                                        <SectionForm>
                                            <Input
                                                type="number"
                                                label="Telepon"
                                                placeholder="Masukan Telepon"
                                                {...register('telp')}
                                                isInvalid={!!errors?.telp}
                                                errorMessage={errors?.telp?.message as any}
                                            />
                                        </SectionForm>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 flex justify-end">
                                <Button isDisabled={processing} isLoading={processing} type="submit" color="primary">
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    )}
                    {tab === 'security' && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Card>
                                <CardBody>
                                    <div className="grid grid-cols-2 gap-2">
                                        <SectionForm>
                                            <PasswordInput
                                                type="password"
                                                label="Password Baru"
                                                placeholder="Masukan Password Baru"
                                                {...register('password')}

                                                onChange={(e: any) => setValue('password', e?.target?.value)}
                                                isInvalid={!!errors?.password}
                                                errorMessage={errors?.password?.message}
                                            />
                                        </SectionForm>
                                        <SectionForm>
                                            <PasswordInput
                                                type="password"
                                                label="Konfirmasi Password Baru"
                                                placeholder="Konfirmasi Password Baru"
                                                {...register('confirmPassword')}
                                                onChange={(e: any) => setValue('confirmPassword', e?.target?.value)}
                                                isInvalid={!!errors?.confirmPassword}
                                                errorMessage={errors?.confirmPassword?.message}
                                            />
                                        </SectionForm>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 flex justify-end">
                                <Button isDisabled={processing} isLoading={processing} type="submit" color="primary">
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
