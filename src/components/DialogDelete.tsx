import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'
import React from 'react'

const DialogDelete = ({ isOpen, onTrigger, title = '', rowSelected, processing }:any) => {
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onTrigger}>
            <ModalContent>
                {(onClose) => (
                    <>

                        <ModalBody>
                            <div className='mt-4'>
                                <div className="text-lg tracking-tighter font-semibold">
                                </div>
                                <p className='font-semibold'>
                                    apakah anda ingin menghapus data ini ?   {title && (
                                        <div>
                                            <strong>{rowSelected[title]}</strong>
                                        </div>

                                    )}
                                </p>
                            </div>
                        </ModalBody>
                        <ModalFooter>

                            <Button isLoading={processing} isDisabled={processing} color="danger" onClick={() => onTrigger()}>
                                Yes
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default DialogDelete