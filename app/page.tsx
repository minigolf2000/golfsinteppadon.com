export const metadata = {
  title: "Golf Sinteppadon",
};

export default async function Home() {
  // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl leading-loose my-36 italic tracking-widest">
        <div className="relative">
          <div className="absolute -left-16">👋</div>
        </div>
        I&apos;m <span className="font-bold">Golf Sinteppadon</span>, a software
        engineer currently at Figma
      </h1>

      <h1 className="font-extrabold text-5xl uppercase tracking-[7px]">
        Personal Projects
      </h1>

      {[
        {
          title: "Figma Widget: Interactive Figmaland",
          href: "https://www.figma.com/community/widget/1117473220251961046/Interactive-Figmaland",
          children: (
            <>
              <a href="https://twitter.com/minigolf2000/status/1542210618073255936">
                GIF from Twitter
              </a>
              . Visit a petting zoo, play hide and seek, race go karts, and
              more! Powered by Widgets, Interactive Figmaland is a multiplayer
              interactive world built and drawn during Figma&apos;s Maker Week.
            </>
          ),
          img: {
            src: "/figmaland.png",
            alt: "interactive 2d pixel art world",
          },
        },
        {
          title: "Figma Plugin: 100 Race",
          href: "https://www.figma.com/community/plugin/983446464948439880/100-Race",
          children: (
            <>
              <a href="https://twitter.com/minigolf2000/status/1403020118586662917">
                GIF from Twitter
              </a>
              . Race to the finish vs. up to 100 people on your own custom race
              courses w/ my Figma Maker Week Plugin, 100 Race! This is a simple
              plugin that takes in user input and does some platforming
              calculations to move a node around. The viewport then follows that
              node. The magic lies in Figma&apos;s multiplayer, which lets up to
              100 users run this plugin simultaneously to edit nodes on the same
              page.
            </>
          ),
          img: {
            src: "/figma-100-race.png",
            alt: "100 race",
          },
        },
        {
          title: "Figma Plugin: Zelda Maker",
          href: "https://www.figma.com/community/plugin/846537436529611787/Zelda-Maker",
          children: (
            <p>
              A Figma Plugin to play and make Zelda worlds. Create worlds right
              in Figma, then run this Plugin to play them! Figma is a
              collaborative interface design tool, and I think level design for
              games is another type of design that benefits greatly from
              collaboration.
            </p>
          ),
          img: {
            src: "/figma-zelda-maker.png",
            alt: "zelda maker",
          },
        },
        {
          title: "Figma Plugin: Asteroids",
          href: "https://www.figma.com/community/plugin/916835579596798269/Figma-Asteroids",
          children: (
            <p>
              Play the arcade game Asteroids in Figma with friends! Supports
              multiplayer. This Figma Maker Week project was inspired by a quote
              from a coworker &quot;Figma is a multiplayer game engine that
              happens to be used for UX design&quot;.
            </p>
          ),
          img: {
            src: "/figma-asteroids.png",
            alt: "figma asteroids",
          },
        },
        {
          title: "Gfychess",
          href: "https://www.gfychess.com",
          children: (
            <p>
              A web tool to create and share chess animated GIFs, co-authored by{" "}
              <a href="https://github.com/caeleel">Karl Jiang</a>. There are
              already excellent chess tools on the web for developing your chess
              game including position evaluators, opening explorers, endgame
              puzzles. What felt missing was a simple way to share an exciting
              moment in a chess game with a friend.
            </p>
          ),
          img: {
            src: "/gfychess.png",
            alt: "user-inputted chess pgn and its generated animated gif",
          },
        },
        {
          title: "Mad Castles",
          href: "https://www.madcastles.com/#+P22,0&-K2-20,-6&-O0-10,-8&-Z0-12,-2&-L1-4,6&-e0-16,8&-G08,0&+w16,-12&+Q012,8&-E318,8&+b222,10&-U116,-2&+k120,-12&+g310,-8&+K04,-4",
          children: (
            <p>
              After spending many hours playing the 2-4 player board game, The
              Castles of Mad King Ludwig, co-author{" "}
              <a href="https://github.com/caeleel">Karl Jiang</a> and I felt the
              need for an automated way to sum up castle points. We created Mad
              Castles, an app that lets you input your castle and tells you how
              many points it is worth.
            </p>
          ),
          img: {
            src: "/mad-castles.png",
            alt: "an example castle and its score",
          },
        },
        {
          title: "Virtuoso Sheet Music",
          href: "https://www.virtuososheetmusic.com",
          children: (
            <p>
              Virtuoso is a concept sheet music device that is designed to
              replace a musician&apos;s sheet music library. Made for a UW Human
              Centered Design & Engineering class, our team gathered feedback
              from student musicians in an attempt to rediscover sheet music.
            </p>
          ),
          img: {
            src: "/virtuoso-sheet-music.png",
            alt: "virtuoso sheet music prototype",
          },
        },
        {
          title: "Winsome Trading Inc",
          href: "https://www.winsomewood.com",
          children: (
            <p>
              Winsome, a furniture distributor, needed customers to be able to
              easily view their products online. Using Ruby on Rails and
              PostgreSQL, I implemented{" "}
              <a href="https://www.alyssachow.com/">Alyssa Chow</a>
              &apos;s visual design and brought Winsome&apos;s furniture
              listings to the web.
            </p>
          ),
          img: {
            src: "/winsome.png",
            alt: "winsome trading homepage",
          },
        },
        {
          title: "Seattle Band Map",
          href: "https://www.seattlebandmap.com",
          children: (
            <p>
              Featured in a{" "}
              <a href="https://www.wired.com/2011/03/seattle-band-map/">
                Wired.com article
              </a>
              , Seattle Band Map is an experimental map of local bands. Powered
              by GraphViz, the user-submitted bands connect to each other if
              they have played together or have shared a band member. The result
              is a sprawling spiderweb of the Seattle music scene.
            </p>
          ),
          img: {
            src: "/seattle-band-map.png",
            alt: "seattle band map",
          },
        },
      ].map(({ title, href, children, img }) => (
        <div className="my-16" key={title}>
          <h2 className="font-bold text-2xl tracking-[3px] uppercase">
            <a href={href} className="hover:underline">
              {title}
            </a>
          </h2>
          <div className="my-6">{children}</div>
          <img width={800} {...img} />
        </div>
      ))}

      <div className="flex flex-row flex-wrap my-24">
        {[
          {
            href: "soccer/",
            title: "AI Soccer",
            description: "Watch the beautiful game",
          },

          {
            href: "chuck/",
            title: "Chuck Norris Facts",
            description: "A different fact every time",
          },

          {
            href: "blocky/",
            title: "Meet Blocky",
            description: "Simple 2D character movement",
          },

          {
            href: "paint/",
            title: "GS Paint",
            description: "Unleash your inner artist",
          },

          {
            href: "https://www.figma.com/community/plugin/783240561193792353/Match-fills-to-local-styles",
            title: "Match fills to local styles",
            description: "Figma plugin for bulk color matching",
          },

          {
            href: "https://www.figma.com/community/plugin/782730833986470710/Image-to-1px-rectangles",
            title: "Image to 1px rectangles",
            description: "Figma plugin for converting images to nodes",
          },
        ].map(({ title, href, description }) => (
          <div key={href} className="w-96 flex flex-col my-8">
            <h2 className="font-bold text-2xl tracking-widest uppercase mb-3">
              <a href={href} className="hover:underline">
                {title}
              </a>
            </h2>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center gap-x-3 mb-6">
        <svg
          className="mr-3"
          width="43"
          height="79"
          viewBox="0 0 43 79"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3L39 39.5L3 76"
            stroke="#BBBBBB"
            strokeWidth="7"
            strokeLinejoin="round"
          />
        </svg>
        <a
          className="underline"
          href="https://www.linkedin.com/in/golfsinteppadon"
        >
          LinkedIn
        </a>
        <div>/</div>
        <a className="underline" href="https://github.com/minigolf2000">
          Github
        </a>
        <div>/</div>
        <a className="underline" href="https://figma.com/@minigolf2000">
          Figma
        </a>
      </div>
    </div>
  );
}
