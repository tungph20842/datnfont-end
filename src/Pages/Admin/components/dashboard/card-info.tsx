interface CardInfoProps {
  icon: React.ReactNode
  title?: string
  onClick?: () => void
  number?: number | string
  price?: boolean
}

export const CardInfo = ({ onClick, title, icon, number, price }: CardInfoProps) => {
  return (
    <div
      onClick={onClick}
      className='rounded-sm cursor-pointer border border-gray-300 hover:border-blue-300 group/item bg-white py-6 px-7 shadow'
    >
      <div className='flex items-center justify-between'>
        <div className='flex h-11 w-11 items-center border group-hover/item:border-blue-300 border-gray-400 justify-center rounded-full bg-meta-2'>
          {icon}
        </div>
      </div>

      <div className='mt-4'>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white'>
            {number || 0} {price ? 'đ' : ''}
          </h4>
          {/* <span className='text-sm font-medium'>Tổng doanh thu dự kiến</span> */}
          <span className='text-sm font-medium'>{title || 'Doanh thu'}</span>
        </div>

        <span className='hidden grid-cols-[9fr,1fr] mt-2 items-center gap-1 text-sm font-medium text-meta-3 text-right'>
          <svg
            className='fill-meta-3'
            width='10'
            height='11'
            viewBox='0 0 10 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z'
              fill=''
            />
          </svg>
        </span>
      </div>
    </div>
  )
}
