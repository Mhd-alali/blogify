// eslint-disable-next-line react/prop-types
export default function Button({ children, Class, ...props }) {
    return <button {...props} className={`py-1 px-6 border-2 text-accent border-accent border-opacity-60 hover:border-opacity-90 font-semibold rounded-md bg-accent bg-opacity-5 hover:bg-opacity-10 transition-colors ${Class}`}>
        {children}
    </button>
}