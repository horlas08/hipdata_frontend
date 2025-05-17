import { useState, useRef, useCallback } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi'
import { IoLogoFacebook } from 'react-icons/io5'
import { FaFacebook } from 'react-icons/fa'

const SponsoredAction = () => {
    const commentInput = useRef<HTMLInputElement>(null)

    const [helpful, setHelpful] = useState('')

    const onHelpfulClick = useCallback((val: string) => {
        setHelpful(val)
    }, [])

    const onCommentSubmit = () => {
        if (commentInput.current) {
            commentInput.current.value = ''
        }
    }

    return (
        <div>
            <Button
                type={'button'}
                className={'mt-3 flex justify-center align-center'}
                variant={'twoTone'}
            >
                <IoLogoFacebook size={28} fill={'blue'} />
                <h4>Facebook</h4>
            </Button>
        </div>
    )
}

export default SponsoredAction
