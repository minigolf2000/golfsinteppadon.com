import Image from "next/image";

function PortfolioItem({
  title,
  description,
  imageUrl,
  imageAlt,
  url,
}: {
  title: string;
  description: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  url: string;
}) {
  return (
    <div className="overflow-auto my-26">
      <h2 className="m-0 p-0 font-bold text-2xl tracking-[3px] uppercase">
        <a href={url} className="no-underline hover:underline">
          {title}
        </a>
      </h2>
      <p className="my-6 mx-0 leading-[1.5em]">{description}</p>
      <a href={url}>
        <Image src={imageUrl} alt={imageAlt} width={800} height={400} />
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-200 mx-auto py-0">
      <h1 className="text-[36px] leading-[150%] my-37 italic font-normal normal-case tracking-[3px]">
        <div className="absolute">
          <div className="relative right-19">👋</div>
        </div>
        I&apos;m <span className="font-bold">Golf Sinteppadon</span>, a software
        engineer currently at Figma
      </h1>

      <h1 className="m-0 p-0 font-extrabold text-[58px] tracking-[7px] my-9 mx-auto uppercase -ml-1">
        Personal Projects
      </h1>

      <PortfolioItem
        title="Figma Widget: Interactive Figmaland"
        description={
          <>
            <a
              className="underline"
              href="https://twitter.com/minigolf2000/status/1542210618073255936"
            >
              GIF from Twitter
            </a>
            . Visit a petting zoo, play hide and seek, race go karts, and more!
            Powered by Widgets, Interactive Figmaland is a multiplayer
            interactive world built and drawn during Figma&apos;s Maker Week.
          </>
        }
        imageUrl="/figmaland.png"
        imageAlt="interactive 2d pixel art world"
        url="https://www.figma.com/community/widget/1117473220251961046/Interactive-Figmaland"
      />

      <PortfolioItem
        title="Figma Plugin: 100 Race"
        description={
          <>
            <a
              className="underline"
              href="https://twitter.com/minigolf2000/status/1403020118586662917"
            >
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
        }
        imageUrl="/figma-100-race.png"
        imageAlt="100 race"
        url="https://www.figma.com/community/plugin/983446464948439880/100-Race"
      />

      <PortfolioItem
        title="Figma Plugin: Zelda Maker"
        description="A Figma Plugin to play and make Zelda worlds. Create worlds right in
          Figma, then run this Plugin to play them! Figma is a collaborative
          interface design tool, and I think level design for games is another
          type of design that benefits greatly from collaboration."
        imageUrl="/figma-zelda-maker.png"
        imageAlt="zelda maker"
        url="https://www.figma.com/community/plugin/846537436529611787/Zelda-Maker"
      />

      <PortfolioItem
        title="Figma Plugin: Asteroids"
        description='Play the arcade game Asteroids in Figma with friends! Supports
          multiplayer. This Figma Maker Week project was inspired by a quote
          from a coworker "Figma is a multiplayer game engine that happens to be
          used for UX design".'
        imageUrl="/figma-asteroids.png"
        imageAlt="figma asteroids"
        url="https://www.figma.com/community/plugin/916835579596798269/Figma-Asteroids"
      />

      <PortfolioItem
        title="Gfychess"
        description={
          <>
            A web tool to create and share chess animated GIFs, co-authored by{" "}
            <a className="underline" href="https://github.com/caeleel">
              Karl Jiang
            </a>
            . There are already excellent chess tools on the web for developing
            your chess game including position evaluators, opening explorers,
            endgame puzzles. What felt missing was a simple way to share an
            exciting moment in a chess game with a friend.
          </>
        }
        imageUrl="/gfychess.png"
        imageAlt="user-inputted chess pgn and its generated animated gif"
        url="https://www.gfychess.com/"
      />

      <PortfolioItem
        title="Mad Castles"
        description={
          <>
            After spending many hours playing the 2-4 player board game, The
            Castles of Mad King Ludwig, co-author{" "}
            <a className="underline" href="https://github.com/caeleel">
              Karl Jiang
            </a>{" "}
            and I felt the need for an automated way to sum up castle points. We
            created Mad Castles, an app that lets you input your castle and
            tells you how many points it is worth.
          </>
        }
        imageUrl="/mad-castles.png"
        imageAlt="an example castle and its score"
        url="https://www.madcastles.com/"
      />

      <PortfolioItem
        title="Virtuoso Sheet Music"
        description="Virtuoso is a concept sheet music device that is designed to replace a
          musician's sheet music library. Made for a UW Human Centered
          Design & Engineering class, our team gathered feedback from student
          musicians in an attempt to rediscover sheet music."
        imageUrl="/virtuoso-sheet-music.png"
        imageAlt="virtuoso sheet music prototype"
        url="https://www.virtuososheetmusic.com/"
      />

      <PortfolioItem
        title="Winsome Trading Inc"
        description={
          <>
            Winsome, a furniture distributor, needed customers to be able to
            easily view their products online. Using NextJS / Vercel, and
            fetching data from Salsify PIM, I implemented{" "}
            <a className="underline" href="https://www.alyssachow.com/">
              Alyssa Chow
            </a>
            &apos;s visual design and brought Winsome&apos;s furniture listings
            to the web.
          </>
        }
        imageUrl="/winsome.png"
        imageAlt="winsome homepage"
        url="http://www.winsomewood.com/"
      />

      <PortfolioItem
        title="Seattle Band Map"
        description={
          <>
            Featured in a{" "}
            <a
              className="underline"
              href="https://www.wired.com/2011/03/seattle-band-map/"
            >
              Wired.com article
            </a>
            , Seattle Band Map is an experimental map of local bands. Powered by
            GraphViz, the user-submitted bands connect to each other if they
            have played together or have shared a band member. The result is a
            sprawling spiderweb of the Seattle music scene.
          </>
        }
        imageUrl="/seattle-band-map.png"
        imageAlt="seattle band map"
        url="https://www.seattlebandmap.com/"
      />

      <div className="flex flex-row items-center justify-end mb-12">
        <svg
          className="mr-4"
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
          href="https://www.linkedin.com/in/golfsinteppadon/"
        >
          LinkedIn
        </a>
        <div className="mx-2">/</div>
        <a className="underline" href="https://github.com/minigolf2000/">
          Github
        </a>
        <div className="mx-2">/</div>
        <a className="underline" href="https://figma.com/@minigolf2000/">
          Figma
        </a>
      </div>
    </div>
  );
}
