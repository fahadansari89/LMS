import { useCreateCheckoutSessionMutation } from '@/feature/api/purchaseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

const BuyCourseButton = ({courseId}) => {
    const[createCheckoutSession,{data, isLoading, isSuccess, isError, error}]=useCreateCheckoutSessionMutation()
    const purchaseCoursehandler= async()=>{
      await createCheckoutSession(courseId)
    }
    useEffect(() => {
      if (isSuccess) {
        if (data?.url) {
            window.location.href=data.url
        }else{
            toast.error("Invalid response")
        }
      }
      if (isError) {
        toast.error(error?.data?.message)
      }
    }, [data, isSuccess, isError,error])
    
  return (
   <>
     <Button disabled={isLoading} onClick={purchaseCoursehandler} className='w-full'>
        {
            isLoading ? (<><Loader2 className='mr-2 h-4 w-4 animate-spin'/> please wait</>):("purchase curse")
        }
     </Button>
   </>
  )
}

export default BuyCourseButton