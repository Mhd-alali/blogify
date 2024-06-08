import { cva } from 'class-variance-authority'

let classes = cva(
    ["text-base", "block", "w-full", "py-2", "outline-none", "placeholder:text-[#aaa]", "error:placeholder:text-red-500",], {
    variants: {
        variant: {
            primary: [
                'border-b',
                'border-b-dark',
                'dark:border-b-light',
                'bg-transparent',
                'error:border-b-red-500',
                'error:dark:border-b-red-50'
            ],
            secondary: [
                'rounded-md',
                'transition-colors',
                'duration-100',
                'px-4',
                'bg-white',
                'outline',
                'border',
                'border-[#ccc]',
                'outline-offset-0',
                'focus:outline-black',
                'focus:dark:outline-transparent',
                'focus:dark:border-transparent',
                'dark:bg-dark',
                'error:bg-red-100',
                'error:dark:bg-red-950',
            ]
        },
    },
    defaultVariants: {
        variant: "primary"
    }
})

/* eslint-disable react/prop-types */
export default function Input({ placeholder, type, Class, error = "", variant, ...props }) {
    // eslint-disable-next-line no-unused-vars

    return (
        <div className={` ${Class}`}>
            <input
                data-error={error}
                className={classes({ variant })}
                type={type}
                placeholder={placeholder}
                {...props}
            />
            {error && <p className="text-xs text-red-500 text-left ">{error}</p>}
        </div>
    )
}