import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import PinInput from 'react-pin-input'
import useAuth from '@/utils/hooks/useAuth'
import { Notification, toast } from '@/components/ui'
import {  isErrorType } from '@/utils/helpeer'
import { PinConfirmationResponse } from '@/@types/auth'
import { ErrorType } from '@/@types/common'

type PinConfirmationProps = {
    dialogIsOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    // setParentSubmit: (isSubmitting: boolean) => void
    onPinOk: () => Promise<void>
}
const PinConfirmation = ({
    dialogIsOpen,
    setIsOpen,
    onPinOk,
}: PinConfirmationProps) => {
    const [pin, setPin] = useState<string>('')
    const [submitting, setSetSubmitting] = useState<boolean>(false)
    const { confirmPin } = useAuth()
    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        setSetSubmitting(false)
        setIsOpen(false)
        setPin('')
    }

    const onDialogOk = async (e: MouseEvent) => {
        // console.log('onDialogOk', e)
        // setIsOpen(false)

        if (pin.length < 4 || pin.length > 4) {
            toast.push(
                <Notification type="danger" duration={3000}>
                    <p>{'pin must be 4 digit character'}</p>
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
            return
        }
        setSetSubmitting(true)
        const res: PinConfirmationResponse| ErrorType = await confirmPin({ pin: pin })

        if (isErrorType(res)) {
            toast.push(
                <Notification type="danger" duration={10000}>
                    <p>{res.message}</p>
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
        else {
            const successRes = res as PinConfirmationResponse
            toast.push(
                <Notification type="success"  duration={10000}>
                    <p>{successRes.message}</p>
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
            onDialogClose(e)
            await onPinOk()
        }
        setSetSubmitting(false)
    }

    return (
        <div>
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                width={400}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4"> User Pin Confirmation</h5>
                <div className={'mx-auto'}>
                    <PinInput
                        length={4}
                        initialValue=""
                        secret={true}
                        secretDelay={100}
                        type="numeric"
                        inputMode="number"
                        style={{
                            padding: '10px',
                            width: 'max-content',
                            marginInline: 'auto',
                        }}
                        inputStyle={{ borderRadius: 10, margin: 5 }}
                        // inputFocusStyle={{ borderColor: 'blue' }}
                        autoSelect={true}
                        focus={true}
                        placeholder={'*'}
                        inputFocusStyle={{
                            borderColor: 'blue',
                            borderWidth: '2px',
                        }}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        // onChange={(value, index) => {}}
                        onComplete={async (value, index) => {
                            setPin(value)
                        }}
                    />
                </div>

                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        disabled={submitting}
                        onClick={onDialogOk}
                    >
                        {submitting ? 'Checking..' : 'Okay'}
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default PinConfirmation
