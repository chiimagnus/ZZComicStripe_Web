// No imports needed

interface HeroSectionProps {
}

function HeroSection({}: HeroSectionProps) {

  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 pt-[200px] pb-[240px] text-center md:px-0" aria-labelledby="hero-heading">
      <div className="mx-auto mb-12 w-full max-w-[600px] md:mb-14">
        <img 
          src="/ZZComicStripe_Web/mainview.jpg" 
          alt="用连环画重讲故事" 
          className="mx-auto w-[80%] rounded-xl shadow-xl md:w-full pointer-events-none select-none"
          loading="eager"
          draggable="false"
        />
      </div>
      <h1 id="hero-heading" className="heading-glow mx-auto text-5xl font-extrabold leading-[1.1] sm:text-6xl md:text-7xl">
        用连环画，重讲你的故事
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-contrast sm:text-lg">
        让沉睡在数字角落的珍贵回忆， 
        化作一页页温暖的连环画。
        我们用AI唤醒影像中的情感，
        让你的故事以全新的方式被讲述、被珍藏、被分享。
      </p>
    </section>
  )
}

export default HeroSection