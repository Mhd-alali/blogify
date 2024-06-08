/* eslint-disable react/prop-types */
export default function Author({ author }) {
    return <div className="grid grid-cols-4 gap-10 bg-light dark:bg-dark p-4 rounded-md">
        <img src={`${import.meta.env.VITE_URL}/assets/${author.picturePath}`} alt="" className="col-span-1 aspect-square object-cover rounded-full " />
        <div className="col-span-3 text-left">
            <h4 className="font-serif font-bold text-2xl pt-4">{author.firstName + " " + author.lastName}</h4>
            <p className="space-x-2 text-neutral-500 text-sm">@{author.userName}</p>
            <p className="font-semibold">{author.description}</p>
        </div>
    </div>
}