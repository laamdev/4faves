export const Footer = () => {
  return (
    <footer className='py-8'>
      <div className='tw-animation text-center text-[10px] text-neutral-400 sm:text-xs'>
        <span>{`Created by `}</span>
        <a
          href='https://github.com/laamdev'
          target='_blank'
          rel='noopener noreferrer'
          className='tw-animation hover:text-primary font-medium underline'
        >
          {`LAAM`}
        </a>

        <span>{`Contribute to the maintenance of the project `}</span>
        <a
          href='https://buymeacoffee.com/laamdev'
          target='_blank'
          rel='noopener noreferrer'
          className='tw-animation hover:text-primary font-medium underline'
        >
          {`here.`}
        </a>
      </div>
    </footer>
  )
}
