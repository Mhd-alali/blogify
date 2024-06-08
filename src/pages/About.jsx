  export default function About() {
    return (
        <div className="container">
            <div className="h-96 flex-col flex items-center justify-center font-serif text-center space-y-4">
                <h1 className="relative text-5xl text-accent font-bold">Blogify.</h1>
                <p className="w-96 ">a project to experment with my programming knowlege.</p>
            </div>
            <div className="bg-dark dark:bg-light relative text-light dark:text-dark px-24 py-24 grid md:grid-cols-8 md:grid-rows-4 opacity-[99%]" >
                <span className="absolute -z-10 bg-light dark:bg-dark w-2 h-2/3 right-40"></span>
                <span className="absolute -z-10 bg-light dark:bg-dark w-2 h-2/3 left-40 bottom-0"></span>
                <div className="py-8 pr-14 md:col-span-4 space-y-4">
                    <h4 className="font-serif text-3xl">We Make website that stand out in the market</h4>
                    <p className="text-sm text-neutral-300 dark:text-dark">A great website can be a game-changer for your business, but only if it truly stands out in the market and captures the attention of your target audience. That&apos;s why we&apos;re committed to creating websites that not only look amazing but also represent your brand in the best possible way, with attention-grabbing visuals, compelling copy, and intuitive navigation that makes it easy for visitors to find what they&apos;re looking for.</p>
                </div>
                <img className="grayscale md:col-span-4 border-8 border-black" src="/images/portfolio.webp" alt="" />
                <div className="md:col-span-4 md:col-start-3 space-y-4 absolute top-96">
                    <img className="grayscale" src="/images/Rectangle 7.png" alt="" />
                    <h4 className="font-serif text-3xl">We tell the stories that makes the most impact</h4>
                    <p className="text-sm text-neutral-300 dark:text-dark">Your website should be as unique as your business, telling your story and capturing the essence of what makes your brand special. That&apos;s why we&apos;re passionate about creating websites that stand out in the market, with custom designs, tailored content, and innovative features that set you apart from the competition and build a strong connection with your audience.</p>
                </div>
                <div className="md:col-span-4 md:col-start-2 space-y-4 md:row-start-4">
                    <h4 className="font-serif text-3xl">We embrace bold ideas to create experiences that exceed expectations</h4>
                    <p className="text-sm text-neutral-300 dark:text-dark">A great experience is about more than just meeting expectations – it&apos;s about going above and beyond to create something that truly resonates with your audience. That&apos;s why we&apos;re passionate about embracing bold ideas and taking risks to create experiences that exceed expectations, whether it&apos;s through innovative design, cutting-edge technology, or engaging storytelling that captures the imagination.</p>
                </div>
            </div>
            <div className="h-96 flex-col flex items-center justify-center font-serif text-center space-y-4">
                <a href='https://muhammed-ali.vercel.app/' target='_blank' rel='noreferrer'>
                    <h4 className="relative text-4xl font-bold">MUHAMMED AL-ALI</h4>
                </a>
                <p className="w-96 ">for more work check out my
                    <a href='https://muhammed-ali.vercel.app/' className='text-accent ml-1' target='_blank' rel='noreferrer'>portfolio</a>.
                </p>
            </div>
        </div>
    )
}