import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='bg-grayBg'>
        <Image src='/../public/logo.png' width={300} height={300} alt='logo' />
        <p className='text-primary'>thedbf</p>
      </div>
    </>
  )
}
