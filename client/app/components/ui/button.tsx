import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex focus:-translate-x-[0.25rem] focus:-translate-y-[0.25rem] focus:shadow-[0.25rem_0.25rem_0] items-center justify-center border outline-none ring-0 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border rounded active:translate-x-0 active:translate-y-0 hover:-translate-x-[0.25rem] hover:-translate-y-[0.25rem] hover:shadow-[0.25rem_0.25rem_0] active:shadow-none transition-all ease-out delay-100',
  {
    variants: {
      variant: {
        default: 'border-foreground bg-background text-foreground',
        primary:
          'bg-primary text-primary-foreground hover:bg-accent hover:shadow-primary hover:text-primary',
        primaryOutline: 'border-foreground bg-transparent text-foreground',
        accent: 'bg-accent text-accent-foreground'
      },
      size: {
        default: 'px-4 py-3',
        icon: 'h-10 w-10',
        smallIcon: 'p-1'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
