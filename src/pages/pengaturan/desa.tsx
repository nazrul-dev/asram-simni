import PasswordInput from '@/components/passwordInput'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import React from 'react'

const ProfilePage = () => {
    return (
        <div>
            <div >

                <form>
                    <div className="grid grid-cols-4 gap-2">
                        <div>
                            <Card>
                                <CardBody>
                                    <div className='flex flex-col gap-2'>
                                        <Button>Profile </Button>
                                        <Button>Keamanan </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className='col-span-3'>
                            <Card>
                                <CardBody>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Input label="Nama" />
                                        </div>
                                        <div>
                                            <Input label="Telepon" />
                                        </div>
                                        <div>
                                            <Input label="Nama" />
                                        </div>
                                        <div>
                                            <Input label="Nama" />
                                        </div>
                                    </div>

                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <PasswordInput label="Nama" />
                                        </div>
                                        <div>
                                            <PasswordInput label="Telepon" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                       
                    </div>

                </form>

            </div>
        </div>
    )
}

export default ProfilePage