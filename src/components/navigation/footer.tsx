export const Footer = () => {
  return (
    <footer className='py-8'>
      <div className='tw-animation text-center text-[10px] text-neutral-400 sm:text-xs'>
        <span>{`Created by `}</span>
        <a
          href='https://www.laam.dev'
          target='_blank'
          rel='noopener noreferrer'
          className='tw-animation hover:text-primary font-medium underline'
        >
          {`laam.dev.`}
        </a>

        <span>{` If you like my work, `}</span>
        <a
          href='https://buymeacoffee.com/laamdev'
          target='_blank'
          rel='noopener noreferrer'
          className='tw-animation hover:text-primary font-medium underline'
        >
          {`buy me a cofee!`}
        </a>
      </div>
    </footer>
  )
}
