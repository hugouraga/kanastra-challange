import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm disabled:bg-slate-500 disabled:border-0 disabled:text-white',
    'focus-visible:ring-2 focus-visible:ring-offset-',
    'active:opacity-80',
  ],

  variants: {
    variant: {
      primary: 'bg-green-800 text-white hover:bg-green-900',
      outline: 'border-2 border-green-900 text-green-900 hover:bg-zinc-100',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

function Button({ variant, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant })} />
}

export { Button }; 