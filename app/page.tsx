import Image from "next/image";

function GameCard({
  title,
  description,
  imageUrl,
  imageAlt,
  url,
  domain,
  className,
  buttonClassName,
}: {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  url: string;
  domain: string;
  className: string;
  buttonClassName: string;
}) {
  return (
    <a
      href={url}
      className={`group flex flex-col rounded-2xl overflow-hidden no-underline ${className}`}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={1280}
        height={720}
        className="w-full h-auto"
      />
      <div className="flex flex-col gap-3 flex-1 px-5 pt-5 pb-6">
        <h3 className="font-extrabold text-xl md:text-2xl tracking-[3px] uppercase">
          {title}
        </h3>
        <p className="leading-[1.5em]">{description}</p>
        <div className="mt-auto pt-2 flex items-center gap-3">
          <span
            className={`rounded-full px-5 py-2 font-bold text-sm tracking-[1px] uppercase group-hover:underline ${buttonClassName}`}
          >
            Play ▸
          </span>
          <span className="text-sm opacity-80">{domain}</span>
        </div>
      </div>
    </a>
  );
}

function PluginItem({
  title,
  description,
  imageUrl,
  url,
}: {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}) {
  return (
    <a
      href={url}
      className="group grid content-start grid-cols-2 md:grid-cols-1 gap-3 md:gap-2 items-center md:items-start no-underline"
    >
      <Image
        src={imageUrl}
        alt=""
        width={800}
        height={400}
        className="w-full aspect-[2/1] object-cover rounded-md border border-zinc-200 group-hover:outline-3 outline-zinc-900 -outline-offset-2"
      />
      <div>
        <h3 className="font-bold text-sm tracking-[1px] uppercase group-hover:underline">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 leading-[1.4em]">{description}</p>
      </div>
    </a>
  );
}

function FooterLinks({ links }: { links: { title: string; url: string }[] }) {
  return links.map((link, i) => (
    <span key={link.url}>
      {i > 0 && <span className="mx-2 text-zinc-300">·</span>}
      <a className="underline underline-offset-2" href={link.url}>
        {link.title}
      </a>
    </span>
  ));
}

export default function Home() {
  return (
    <div className="max-w-200 w-full px-4 mx-auto py-0">
      <h1 className="text-2xl md:text-3xl leading-[150%] my-12 md:my-20 italic tracking-[3px] relative">
        <span className="absolute -left-16">👋</span>
        I&apos;m <span className="font-bold">Golf Sinteppadon</span>, a software
        engineer currently at Figma
      </h1>

      <section>
        <h2 className="font-extrabold text-sm tracking-[5px] uppercase mb-4">
          Escape Cats · two browser games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GameCard
            title="Hex Clicker"
            description="A cookie clicker starring Hex. Pet her for mice, build a mouse empire, then put her to sleep and watch her dreams spell out a secret word."
            imageUrl="/hex-clicker.png"
            imageAlt="Hex the black cat over a pink polka-dot sky, with the upgrade shop open below"
            url="https://hexxygon.com/"
            domain="hexxygon.com"
            className="bg-[#f4c3c5] text-[#2a1719]"
            buttonClassName="bg-[#2a1719] text-white"
          />
          <GameCard
            title="Goomba Glider"
            description="A line rider where the track is silly bandz. Stretch four bands, hit play, and steer Goomba past every watering can to the plant."
            imageUrl="/goomba-glider.png"
            imageAlt="Goomba the orange cat on a board, with a watering can and a potted plant against a night sky"
            url="https://g00.mba/"
            domain="g00.mba"
            className="bg-[#1c1030] text-[#f2eaff]"
            buttonClassName="bg-[#4fd1c5] text-[#12091f]"
          />
        </div>
        <p className="text-sm text-zinc-600 mt-4">
          Both started as four-player co-op puzzles for a real escape room, and
          now run solo in any browser.
        </p>
      </section>

      <section className="mt-14 md:mt-20 mb-12">
        <h2 className="font-extrabold text-sm tracking-[5px] uppercase mb-4">
          Games built as Figma Plugins
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PluginItem
            title="Figmaland"
            description="A multiplayer pixel world with a petting zoo, hide and seek and go karts"
            imageUrl="/figmaland.png"
            url="https://www.figma.com/community/widget/1117473220251961046/Interactive-Figmaland"
          />
          <PluginItem
            title="100 Race"
            description="A platformer race for up to 100 people in one file"
            imageUrl="/figma-100-race.png"
            url="https://www.figma.com/community/plugin/983446464948439880/100-Race"
          />
          <PluginItem
            title="Zelda Maker"
            description="Draw a Zelda world on the canvas, then play it"
            imageUrl="/figma-zelda-maker.png"
            url="https://www.figma.com/community/plugin/846537436529611787/Zelda-Maker"
          />
          <PluginItem
            title="Asteroids"
            description="The arcade game, playable with friends inside Figma"
            imageUrl="/figma-asteroids.png"
            url="https://www.figma.com/community/plugin/916835579596798269/Figma-Asteroids"
          />
        </div>
      </section>

      <footer className="border-t border-zinc-200 pt-6 pb-12 text-sm text-zinc-500 flex flex-wrap justify-between gap-x-8 gap-y-3">
        <p>
          Other projects:{" "}
          <FooterLinks
            links={[
              { title: "Gfychess", url: "https://www.gfychess.com/" },
              { title: "Mad Castles", url: "https://www.madcastles.com/" },
              {
                title: "Virtuoso Sheet Music",
                url: "https://www.virtuososheetmusic.com/",
              },
              { title: "Winsome", url: "http://www.winsomewood.com/" },
              {
                title: "Seattle Band Map",
                url: "https://www.seattlebandmap.com/",
              },
            ]}
          />
        </p>
        <p>
          <FooterLinks
            links={[
              {
                title: "LinkedIn",
                url: "https://www.linkedin.com/in/golfsinteppadon/",
              },
              { title: "Github", url: "https://github.com/minigolf2000/" },
              { title: "Figma", url: "https://figma.com/@minigolf2000/" },
            ]}
          />
        </p>
      </footer>
    </div>
  );
}
